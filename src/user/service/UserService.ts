import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../model/UserSchema";
import { RegisterRequestUser } from "../dto/req/RegisterRequestUser";
import { LoginRequestUser } from "../dto/req/LoginRequestUser";
import { AllResponUser } from "../dto/res/AllResponUser";
import { UpdateUserByIdRespon } from "../dto/res/UpdateResponUser";
import { UpdateUserByIdRequest } from "../dto/req/UpdateRequestUser";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService) { }

    //hàm đăng ký tài khoản
    async register(registerRequestUser: RegisterRequestUser): Promise<AllResponUser> {
        try {
            //kiểm tra email đã tồn tại chưa và hash password
            const user = await this.userModel.findOne({ email: registerRequestUser.email });
            if (user) {
                throw new Error('Email đã tồn tại');
            }
            //hash password 10 lần là 10 lần bcrypt.hash
            const salt = await bcrypt.genSalt(10);
            //là password đã được hash bằng bcrypt
            const hashPassword = await bcrypt.hash(registerRequestUser.password, salt);
            //tạo mới user
            const { fullname, email, password, confirmPassword } = registerRequestUser;
            const NewUser = new this.userModel({ fullname, email, password: hashPassword });
            //kiểm tra password và confirm password có giống nhau không
            if (password !== confirmPassword) {
                throw new Error('Mật khẩu không khớp');
            }
            //trả về kết quả
            await NewUser.save();
            const allResponUser: AllResponUser = {
                status: true,
                message: 'Đăng ký thành công',
                data: NewUser
            };
            return allResponUser;
        } catch (error: any) {
            console.log("🚀 ~ file: UserService.ts ~ line 58 ~ UserService ~ register ~ error", error)
            const allResponUser: AllResponUser = {
                status: false,
                message: 'Đăng ký thất bại',
                data: null
            };
            return allResponUser;
        }
    }

    //hàm đăng nhập
    async login(loginRequestUser: LoginRequestUser): Promise<AllResponUser> {
        try {
            const { email, password } = loginRequestUser;
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new Error('Email không tồn tại');
            }
            //kiểm tra password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Mật khẩu không đúng');
            }
            //tạo token cho user và token đó trả về sẽ có là token.data và data là thông tin toàn bộ user
            const token = await this.jwtService.sign({ data: user });
            // Trả về kết quả bao gồm token và thông tin user
            const allResponUser: AllResponUser = {
                status: true,
                message: 'Đăng nhập thành công',
                data: { token, user }
            };
            return allResponUser;
        } catch (error: any) {
            console.log("🚀 ~ file: UserService.ts:75 ~ UserService ~ login ~ error:", error)
            const allResponUser: AllResponUser = {
                status: false,
                message: 'Đăng nhập thất bại',
                data: null
            }
            return allResponUser;
        }
    }

    //hàm lấy thông tin id user
    async getUserById(id: string): Promise<AllResponUser> {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new Error('Không tìm thấy user');
            }
            const allResponUser: AllResponUser = {
                status: true,
                message: 'Lấy thông tin user thành công',
                data: user
            };
            return allResponUser;
        } catch (error: any) {
            console.log("🚀 ~ file: UserService.ts:103 ~ UserService ~ getUserById ~ error", error)
            const allResponUser: AllResponUser = {
                status: false,
                message: 'Lấy thông tin user thất bại',
                data: null
            };
            return allResponUser;
        }
    }

    //hàm update thông tin user
    async updateUserById(id: string, request: UpdateUserByIdRequest): Promise<UpdateUserByIdRespon> {
        try {
            const user = await this.userModel.findById(id)
            if (!user) {
                throw new Error('Không tìm thấy user');
            }
            const { fullname, avatar, mobile, gender, nickname, birthday } = request;
            user.fullname = fullname ? fullname : user.fullname;
            user.avatar = avatar ? avatar : user.avatar;
            user.mobile = mobile ? mobile : user.mobile;
            user.gender = gender ? gender : user.gender;
            user.nickname = nickname ? nickname : user.nickname;
            user.birthday = birthday ? birthday : user.birthday;
            const result = await user.save();
            const updateUserByIdRespon: UpdateUserByIdRespon = {
                status: true,
                message: 'Cập nhật thông tin user thành công',
                data: result
            };
            return updateUserByIdRespon;
        } catch (error: any) {
            console.log("🚀 ~ file: UserService.ts:133 ~ UserService ~ updateUserById ~ error", error)
            const updateUserByIdRespon: UpdateUserByIdRespon = {
                status: false,
                message: 'Cập nhật thông tin user thất bại',
                data: null
            }
            return updateUserByIdRespon;
        }
    }

}