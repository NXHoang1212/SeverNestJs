import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';


//anotation là chỉ định cho class này là controller
//để điều khiển các request
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // url  localhost:3000/upload
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   return this.appService.uploadImageToCloudinary(file);
  // }

}
