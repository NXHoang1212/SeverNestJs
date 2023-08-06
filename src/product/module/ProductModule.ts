import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductController } from '../controller/ProductController'
import { ProductService } from '../service/ProductService'
import { Product, ProductSchema } from '../model/ProductSchema'
import { LoggerProduct } from '../../middleware/logger/LoggerProduct'

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