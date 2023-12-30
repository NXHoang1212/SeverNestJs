import { TasksService } from './Task.Service';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { PromotionAdminService } from 'src/promotion/service/Promotion.Admin.Service';
import { PromotionSchema, Promotion } from '../promotion/model/PromotionSchema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Promotion.name, schema: PromotionSchema },
    ]),
  ],
  providers: [TasksService, PromotionAdminService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
  }
}
