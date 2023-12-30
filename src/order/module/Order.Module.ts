import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../model/OrderSchema';
import { LoggerOrder } from 'src/middleware/logger/Logger.Order';
import { OrderAdminController } from '../controller/Order.Admin.Controller';
import { OrderUserController } from '../controller/Order.User.Controller';
import { OrderUserService } from '../service/Order.User.Service';
import { OrderAdminService } from '../service/Order.Admin.Service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderUserController, OrderAdminController],
  providers: [OrderUserService, OrderAdminService],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerOrder)
      .forRoutes(OrderUserController, OrderAdminController);
  }
}
