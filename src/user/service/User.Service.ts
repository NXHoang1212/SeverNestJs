import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, set } from 'mongoose';
import { User, UserDocument } from '../model/User.Schema';
import { RegisterRequestUser } from '../dto/req/RegisterUser.Request';
import { LoginRequestUser } from '../dto/req/LoginUser.Request';
import { AllResponseUser } from '../dto/res/AllUser.Response';
import { UpdateUserByIdResponse } from '../dto/res/UpdateUser.Response';
import { UpdateUserByIdRequest } from '../dto/req/UpdateUser.Request';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { CloudinaryUploader } from 'src/middleware/upload/UploadMulter';
import { app, auth } from 'firebase-admin';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) { }
  async login(request: LoginRequestUser): Promise<AllResponseUser> {
    try {
      let user;
      if (request.facebookId) {
        user = await this.userModel.findOne({ facebookId: request.facebookId, avatar: request.avatar });
        if (!user) {
          user = new this.userModel({ facebookId: request.facebookId , avatar: request.avatar });
          await user.save();
        }
      } else if (request.googleId) {
        user = await this.userModel.findOne({ googleId: request.googleId, avatar: request.avatar });
        if (!user) {
          user = new this.userModel({ googleId: request.googleId, avatar: request.avatar });
          await user.save();
        }
      } else {
        user = await this.userModel.findOne({ mobile: request.mobile });
        if (!user) {
          user = new this.userModel({ mobile: request.mobile });
          await user.save();
        }
      }
      const payload = { id: user._id };
      const token = await this.jwtService.sign(payload);
      const allResponUser: AllResponseUser = {
        status: true,
        message: 'Đăng nhập thành công',
        data: { token, user },
      };
      return allResponUser;
    } catch (error: any) {
      const allResponUser: AllResponseUser = {
        status: false,
        message: error.message,
        data: null,
      };
      return allResponUser;
    }
  }

  async getUserById(id: string): Promise<AllResponseUser> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new Error('Không tìm thấy user');
      }
      const allResponUser: AllResponseUser = {
        status: true,
        message: 'Lấy thông tin user thành công',
        data: user,
      };
      return allResponUser;
    } catch (error: any) {
      const allResponUser: AllResponseUser = {
        status: false,
        message: 'Lấy thông tin user thất bại',
        data: null,
      };
      return allResponUser;
    }
  }

  async updateUserById(id: string, request: UpdateUserByIdRequest,): Promise<UpdateUserByIdResponse> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new Error('Không tìm thấy user');
      }
      const { name, holder, email, gender, birthday, avatar, mobile } = request;
      user.name = name ? name : user.name;
      user.holder = holder ? holder : user.holder;
      user.email = email ? email : user.email;
      user.gender = gender ? gender : user.gender;
      user.birthday = birthday ? birthday : user.birthday;
      user.avatar = avatar ? avatar : user.avatar;
      user.mobile = mobile ? mobile : user.mobile;
      await user.save();
      const updateUserByIdResponse: UpdateUserByIdResponse = {
        status: true,
        message: 'Cập nhật thông tin user thành công',
        data: user,
      };
      return updateUserByIdResponse;
    } catch (error: any) {
      const updateUserByIdRespon: UpdateUserByIdResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return updateUserByIdRespon;
    }
  }

  async uploadAvatar(id: string, avatar: Express.Multer.File,): Promise<UpdateUserByIdResponse> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new Error('Không tìm thấy user');
      }
      const image = await CloudinaryUploader.uploadAvatar(avatar.path);
      user.avatar = image.secure_url;
      await user.save();
      const updateUserByIdResponse: UpdateUserByIdResponse = {
        status: true,
        message: 'Cập nhật avatar thành công',
        data: user,
      };
      return updateUserByIdResponse;
    } catch (error: any) {
      const updateUserByIdRespon: UpdateUserByIdResponse = {
        status: false,
        message: error.message,
        data: null,
      };
      return updateUserByIdRespon;
    }
  }
}

//hàm đăng ký tài khoản
// async register(request: RegisterRequestUser): Promise<AllResponUser> {
//     try {
//         //kiểm tra email đã tồn tại chưa và hash password
//         const user = await this.userModel.findOne({ email: request.email });
//         if (user) {
//             throw new Error('Email đã tồn tại');
//         }
//         //hash password 10 lần là 10 lần bcrypt.hash
//         const salt = await bcrypt.genSalt(10);
//         //là password đã được hash bằng bcrypt
//         const hashPassword = await bcrypt.hash(request.password, salt);
//         //tạo mới user
//         const { fullname, email, password, confirmPassword } = request;
//         const NewUser = new this.userModel({ fullname, email, password: hashPassword });
//         //kiểm tra password và confirm password có giống nhau không
//         if (password !== confirmPassword) {
//             throw new Error('Mật khẩu không khớp');
//         }
//         //trả về kết quả
//         await NewUser.save();
//         const allResponUser: AllResponUser = {
//             status: true,
//             message: 'Đăng ký thành công',
//             data: NewUser
//         };
//         return allResponUser;
//     } catch (error: any) {
//         console.log("🚀 ~ file: UserService.ts ~ line 58 ~ UserService ~ register ~ error", error)
//         const allResponUser: AllResponUser = {
//             status: false,
//             message: 'Đăng ký thất bại',
//             data: null
//         };
//         return allResponUser;
//     }
// }

//hàm quên mật khẩu và khi quên sẽ gửi mail
// async forgotPassword(email: String): Promise<ForgotPasswordRespon> {
//     try {
//         const user = await this.userModel.findOne({ email });
//         if (!user) {
//             throw new Error('Email không tồn tại');
//         }
//         const otp = new GenerateOTP().generateOTP();
//         user.resetOTP = otp; // Lưu OTP vào cơ sở dữ liệu
//         await user.save();
//         const sendMail = await this.mailerService.sendMail({
//             to: email.toString(),
//             subject: 'OTP to reset password',
//             html: `<p>Your OTP to reset password is <b>${otp}</b></p>`,
//         });
//         // Gọi hàm clearExpiredOTP để xóa OTP hết hạn sau 2 phút
//         const clearExpiredOTPService = new ClearExpiredOTPService(this.userModel);
//         setTimeout(async () => {
//             await clearExpiredOTPService.clearExpiredOTP();
//         }, 120000);
//         const forgotPasswordRespon: ForgotPasswordRespon = {
//             status: true,
//             message: 'Gửi mail thành công',
//             data: sendMail
//         };
//         return forgotPasswordRespon;
//     } catch (error) {
//         console.error('Lỗi trong quá trình gửi email:', error.message);
//         const forgotPasswordRespon: ForgotPasswordRespon = {
//             status: false,
//             message: 'Gửi mail thất bại',
//             data: null
//         };
//         return forgotPasswordRespon;
//     }
// }

//hàm xác nhận otp sau khi xác nhấnj otp sẽ xóa khỏi trường resetOTP
// async verifyOtp(email: String, request: ForgotPasswordRequest): Promise<ForgotPasswordRespon> {
//     try {
//         const user = await this.userModel.findOne({ email });
//         if (!user) {
//             throw new Error('Email không tồn tại');
//         }
//         //nếu otp nhập vào không trùng với otp trong database thì sẽ báo lỗi
//         if (user.resetOTP !== request.otp) {
//             throw new Error('OTP không đúng');
//         }
//         //nếu otp nhập vào trùng với otp trong database thì sẽ hash password thành null
//         user.password = await bcrypt.hash('null', 10);
//         // Xóa OTP đã sử dụng
//         user.resetOTP = undefined;
//         await user.save();
//         const forgotPasswordRespon: ForgotPasswordRespon = {
//             status: true,
//             message: 'Xác nhận OTP thành công',
//             data: null
//         };
//         return forgotPasswordRespon;
//     } catch (error) {
//         console.error('Lỗi trong quá trình xác nhận OTP:', error.message);
//         const forgotPasswordRespon: ForgotPasswordRespon = {
//             status: false,
//             message: 'Xác nhận OTP thất bại',
//             data: null
//         };
//         return forgotPasswordRespon;
//     }
// }

//hàm đổi mật khẩu
// async resetPassword(email: String, request: ForgotPasswordRequest): Promise<ForgotPasswordRespon> {
//     try {
//         const user = await this.userModel.findOne({ email });
//         if (!user) {
//             throw new Error('Email không tồn tại');
//         }
//         //kiểm tra password và confirm password có giống nhau không
//         if (request.password !== request.confirmPassword) {
//             throw new Error('Mật khẩu không khớp');
//         }
//         //hash password 10 lần là 10 lần bcrypt.hash
//         const salt = await bcrypt.genSalt(10);
//         //là password đã được hash bằng bcrypt
//         const hashPassword = await bcrypt.hash(request.password, salt);
//         user.password = hashPassword;
//         await user.save();
//         const forgotPasswordRespon: ForgotPasswordRespon = {
//             status: true,
//             message: 'Đổi mật khẩu thành công',
//             data: null
//         };
//         return forgotPasswordRespon;

//     } catch (error: any) {
//         console.log("🚀 ~ file: UserService.ts ~ line 262 ~ UserService ~ changePassword ~ error", error)
//         const forgotPasswordRespon: ForgotPasswordRespon = {
//             status: false,
//             message: 'Đổi mật khẩu thất bại',
//             data: null
//         };
//         return forgotPasswordRespon;
//     }
// }
