import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//anotation là chỉ định cho class này là controller
//để điều khiển các request
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
