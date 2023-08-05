import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductController } from '../controller/ProductController'
import { ProductService } from '../service/ProductService'
import { Product, ProductSchema } from '../model/ProductSchema'


//đây là module của product
@Module({
    imports:
        [
            MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
        ],
    controllers: [ProductController],
    providers: [ProductService],
})

//đây là module của product
export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply()
            .forRoutes(ProductController)
    }
}