import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notication, NoticationSchema } from '../model/NoticationSchema';
import { LoggerNotication } from 'src/middleware/logger/Logger.Notication';
import { NoticationController } from '../controller/Notication.Controller';
import { NoticationService } from '../service/Notication.Service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notication.name, schema: NoticationSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: 'hello',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [NoticationController],
  providers: [NoticationService],
})
export class NoticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerNotication).forRoutes(NoticationController);
  }
}
