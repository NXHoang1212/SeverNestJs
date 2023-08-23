import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Size, SizeSchema } from '../model/Size.Model'
import { SizeController } from '../controller/Size.Controller'
import { SizeService } from '../service/Size.Service'
import { LoggerSize } from 'src/middleware/logger/Logger.Size'



//đây là module của product
@Module({
    imports:
        [
            MongooseModule.forFeature([{ name: Size.name, schema: SizeSchema }]),

        ],
    controllers: [SizeController],
    providers: [SizeService],
})

//đây là module của product
export class SizeModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerSize)
            .forRoutes(SizeController)
    }
}