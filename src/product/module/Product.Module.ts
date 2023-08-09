import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductController } from '../controller/Product.Controller'
import { ProductService } from '../service/Product.Service'
import { Product, ProductSchema } from '../model/Product.Schema'
import { LoggerProduct } from '../../middleware/logger/Logger.Product'

//đây là module của product
@Module({
    imports:
        [
            MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
            //cho đường dẫn của ảnh vào src để lưu ảnh
        ],
    controllers: [ProductController],
    providers: [ProductService],
})

//đây là module của product
export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerProduct)
            .forRoutes(ProductController)
    }
}