import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  Query,
  UseGuards,
  Render,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { RegisterRequestUser } from '../dto/req/RegisterUser.Request';
import { UserService } from '../service/User.Service';
import { LoginRequestUser } from '../dto/req/LoginUser.Request';
import { UpdateUserByIdRequest } from '../dto/req/UpdateUser.Request';
import { GrauthAuthen } from 'src/middleware/gaurd/Gaurd.Authen';
import { ForgotPasswordRequest } from '../dto/req/Password.Request';
import { MulterConfig } from 'src/middleware/upload/UploadMulter';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //url: http://localhost:3000/api/users/login
  @Post('login')
  async login(@Body() body: LoginRequestUser, @Res() res: Response) {
    try {
      const allResponUser = await this.userService.login(body);
      return res.status(HttpStatus.OK).json(allResponUser);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  //url: http://localhost:3000/api/users/getUserById/:id
  @UseGuards(GrauthAuthen)
  @Get('getUserById/:id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    try {
      const getUserById = await this.userService.getUserById(id);
      return res.status(HttpStatus.OK).json(getUserById);
    } catch (error: any) {
      console.log(
        '🚀 ~ file: UserController.ts ~ line 47 ~ UserController ~ getUserById ~ error',
        error,
      );
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  //url: http://localhost:3000/api/users/updateUserById/:id
  @Post('updateUserById/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() body: UpdateUserByIdRequest,
    @Res() res: Response,
  ) {
    try {
      const updateUserById = await this.userService.updateUserById(id, body);
      return res.status(HttpStatus.OK).json(updateUserById);
    } catch (error: any) {
      console.log(
        '🚀 ~ file: UserController.ts ~ line 58 ~ UserController ~ updateUserById ~ error',
        error,
      );
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Post('upload-avatar/:id')
  @UseInterceptors(FileInterceptor('avatar', MulterConfig))
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() avatar: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const uploadAvatar = await this.userService.uploadAvatar(id, avatar);
      return res.status(HttpStatus.OK).json(uploadAvatar);
    } catch (error: any) {
      console.log(
        '🚀 ~ file: UserController.ts ~ line 69 ~ UserController ~ uploadAvatar ~ error',
        error,
      );
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
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
