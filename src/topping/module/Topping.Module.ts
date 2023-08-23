import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Topping, ToppingSchema } from '../model/Topping.Model'
import { ToppingController } from '../controller/Topping.Controller'
import { ToppingService } from '../service/Topping.Service'
import { LoggerTopping } from 'src/middleware/logger/Logger.Topping'



//đây là module của product
@Module({
    imports:
        [
            MongooseModule.forFeature([{ name: Topping.name, schema: ToppingSchema }]),

        ],
    controllers: [ToppingController],
    providers: [ToppingService],
})

//đây là module của product
export class ToppingModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerTopping)
            .forRoutes(ToppingController)
    }
}