import { Module } from '@nestjs/common';
import { MyLogger } from 'src/middleware/logger/Logger.App';

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
