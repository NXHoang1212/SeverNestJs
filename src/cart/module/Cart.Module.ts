import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from '../model/Cart.Model';
import { CartController } from '../controller/Cart.Controller';
import { CartSerivce } from '../service/Cart.Service';
import { LoggerCart } from 'src/middleware/logger/Logger.Cart';

//đây là module của product
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [CartController],
  providers: [CartSerivce],
})

//đây là module của product
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerCart).forRoutes(CartController);
  }
}
