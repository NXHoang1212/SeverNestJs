import { Injectable, BadRequestException, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello() {
    this.logger.log('Hello World!');
  }
}
