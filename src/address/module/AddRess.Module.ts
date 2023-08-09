import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Address, AddressSchema } from '../model/Address.Model'
import { AddressController } from '../controller/Address.Controller'
import { AddressService } from '../service/Address.Service'
import { LoggerAddress } from 'src/middleware/logger/Logger.Address'



//đây là module của product
@Module({
    imports:
        [
            MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),

        ],
    controllers: [AddressController],
    providers: [AddressService],
})

//đây là module của product
export class AddressModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerAddress)
            .forRoutes(AddressController)
    }
}