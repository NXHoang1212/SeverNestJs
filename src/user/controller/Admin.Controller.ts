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

@Controller('api/admin')
@UseGuards(RolesGuard)
export class AdminController {
    constructor(private readonly adminservice: AdminService) { }
    //url: http://localhost:3000/cpanel/admin/login
    @Post('login')
    async login(@Body() body: LoginRequestUser, @Res() res: Response) {
        try {
            const user = await this.adminservice.loginadmin(body);
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Get('login')
    @Render('web/Login')
    renderLogin() {
        return {};
    }
    // @Get('Order')
    // @Render('web/ManagerOrder')
    // renderOrder() {
    //     return {};
    // }
    @Get('Internal')
    @Render('web/ManagerInternal')
    renderInternal() {
        return {};
    }
    @Get('Revenue')
    @Render('web/ManagerRevenue')
    renderRevenue() {
        return {};
    }
    @Get('Statement')
    @Render('web/ManagerStatement')
    renderStatement() {
        return {};
    }

    @Get('ForgotPassword')
    @Render('web/ForgotPasswordAdmin')
    renderForgotPassword() {
        return {};
    }
    @Get('AddOrder')
    @Render('web/FormAddOrder')
    renderAddOrder() {
        return {};
    }

    @Get('AddInternal')
    @Render('web/FormAddInternal')
    renderAddInternal() {
        return {};
    }

    @Get('AddCustomer')
    @Render('web/FormAddStaft')
    renderAddStaft() {
        return {};
    }

    @Get('AddStatement')
    @Render('web/FormStatement')
    renderAddStatement() {
        return {};
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