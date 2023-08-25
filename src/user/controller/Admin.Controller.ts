import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, UseGuards, Render } from "@nestjs/common";
import { Response, Request } from "express";
import { RegisterRequestUser } from "../dto/req/RegisterUser.Request";
import { LoginRequestUser } from "../dto/req/LoginUser.Request";
import { UpdateUserByIdRequest } from "../dto/req/UpdateUser.Request";
import { GrauthAuthen } from "src/middleware/gaurd/Gaurd.Authen";
import { ForgotPasswordRequest } from "../dto/req/Password.Request";
import { AdminService } from "../service/Admin.Service";
import { Roles } from "src/middleware/permission/Roles.decorator";
import { UserRoles } from "../model/User.Schema";
import { RolesGuard } from "src/middleware/permission/Roles.Guard";

@Controller('cpanel/admin')
// @UseGuards(RolesGuard)
export class AdminController {
    constructor(private readonly adminservice: AdminService) { }
    @Post('login')
    async login(@Body() body: LoginRequestUser, @Res() res: Response) {
        try {
            const { email, password } = body;
            if (email === 'admin@gmail.com' && password === '123456') {
                return res.render('web/HomePage');
            } else {
                throw new Error('Sai email hoặc mật khẩu');
            }
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Sai email hoặc mật khẩu' });
        }
    }
    @Get('login')
    @Render('web/Login') // Render trang đăng nhập
    renderLogin() {
        return {}; // Truyền dữ liệu tùy ý cho trang đăng nhập
    }
}


// //url: http://localhost:3000/api/users/register
// @Post('register')
// async register(@Body() body: RegisterRequestUser, @Res() res: Response) {
//     try {
//         const allResponUser = await this.userService.register(body);
//         return res.status(HttpStatus.OK).json(allResponUser);
//     } catch (error: any) {
//         console.log("🚀 ~ file: UserController.ts:19 ~ UserController ~ register ~ error:", error)
//         return res.status(HttpStatus.BAD_REQUEST).json(error);
//     }
// }

//url: http://localhost:3000/api/users/email/forgotPassword/:email
// @Post('email/forgotPassword/:email')
// async forgotPassword(@Param('email') email: String, @Res() res: Response) {
//     try {
//         const forgotPassword = await this.userService.forgotPassword(email);
//         return res.status(HttpStatus.OK).json(forgotPassword);
//     } catch (error: any) {
//         console.log("🚀 ~ file: UserController.ts ~ line 69 ~ UserController ~ forgotPassword ~ error", error)
//         return res.status(HttpStatus.BAD_REQUEST).json(error);
//     }
// }

//url: http://localhost:3000/api/users/verifyOtp/:email
// @Post('verifyOtp/:email')
// async verifyOtp(@Param('email') email: String, @Body() body: ForgotPasswordRequest, @Res() res: Response) {
//     try {
//         const verifyOtp = await this.userService.verifyOtp(email, body);
//         return res.status(HttpStatus.OK).json(verifyOtp);
//     } catch (error: any) {
//         console.log("🚀 ~ file: UserController.ts ~ line 80 ~ UserController ~ verifyOtp ~ error", error)
//         return res.status(HttpStatus.BAD_REQUEST).json(error);
//     }
// }

//url: http://localhost:3000/api/users/resetPassword/:email
// @Post('resetPassword/:email')
// async resetPassword(@Param('email') email: String, @Body() body: ForgotPasswordRequest, @Res() res: Response) {
//     try {
//         const resetPassword = await this.userService.resetPassword(email, body);
//         return res.status(HttpStatus.OK).json(resetPassword);
//     } catch (error: any) {
//         console.log("🚀 ~ file: UserController.ts ~ line 91 ~ UserController ~ resetPassword ~ error", error)
//         return res.status(HttpStatus.BAD_REQUEST).json(error);
//     }
// }