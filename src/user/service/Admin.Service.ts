import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, set } from "mongoose";
import { User, UserDocument, UserRoles } from "../model/User.Schema";
import { LoginRequestUser } from "../dto/req/LoginUser.Request";
import { AllResponseUser } from "../dto/res/AllUser.Response";
import { UpdateUserByIdResponse } from "../dto/res/UpdateUser.Response";
import { UpdateUserByIdRequest } from "../dto/req/UpdateUser.Request";
import { ForgotPasswordRequest } from "../dto/req/Password.Request";
import { ForgotPasswordRespon } from "../dto/res/Password.Response";
import * as bcrypt from 'bcrypt';
import { hashPassword } from "src/utils/HashPassword";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from '@nestjs-modules/mailer';
import { admin } from "src/utils/AdminAccount";

@Injectable()
export class AdminService {
    constructor(@InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService) { }
    async loginadmin(request: LoginRequestUser): Promise<AllResponseUser> {
        try {
            let user;
            const { email, password } = request;
            if (email === admin.email && password === admin.password) {
                const hashedPassword = await hashPassword(admin.password);
                user = await this.userModel.findOne({ email: admin.email });
                if (!user) {
                    user = new this.userModel({ email: admin.email, role: UserRoles.Admin, password: hashedPassword });
                    await user.save();
                }
            }
            if (!user) {
                throw new Error("Email không tồn tại");
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Mật khẩu không đúng");
            }
            const payload = { email: email, roles: UserRoles.Admin };
            const token = await this.jwtService.sign(payload);
            const ReponseAdmin: AllResponseUser = {
                status: true,
                message: 'Login success',
                data: { token, user }
            };
            return ReponseAdmin;
        } catch (error: any) {
            const ReponseAdmin: AllResponseUser = {
                status: false,
                message: 'Login fail',
                data: null
            };
            return ReponseAdmin;
        }
    }
}
