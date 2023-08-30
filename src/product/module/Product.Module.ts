import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductController } from '../controller/Product.Controller'
import { ProductService } from '../service/Product.Service'
import { Product, ProductSchema } from '../model/Product.Schema'
import { LoggerProduct } from '../../middleware/logger/Logger.Product'
import { ProductAdminController } from '../controller/ProductAdmin.Controller'
import { ProductAdminService } from '../service/ProductAdmin.Service'

//đây là module của product
@Module({
    imports:
        [
            MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
            //cho đường dẫn của ảnh vào src để lưu ảnh
        ],
    controllers: [ProductController, ProductAdminController],
    providers: [ProductService, ProductAdminService],
})

//đây là module của product
export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerProduct)
            .forRoutes(ProductController)
    }
}