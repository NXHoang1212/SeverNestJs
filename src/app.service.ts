import { Injectable, BadRequestException, Res } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() { }
  getHello(): string {
    return 'Hello World!';
  }
}
