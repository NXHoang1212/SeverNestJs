import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, Query, UseInterceptors, UploadedFile, Req, Render } from "@nestjs/common";
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';


//anotation là chỉ định cho class này là controller
//để điều khiển các request
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  //url: localhost:3000/homepage
  //render ra trang homepage
  // @Get('homepage')
  // @Render('web/HomePage')
  // getHomePage() { }
}
