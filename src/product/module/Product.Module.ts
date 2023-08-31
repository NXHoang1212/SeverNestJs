import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductController } from '../controller/Product.Controller'
import { ProductService } from '../service/Product.Service'
import { Product, ProductSchema } from '../model/Product.Schema'
import { LoggerProduct } from '../../middleware/logger/Logger.Product'
import { ProductAdminController } from '../controller/ProductAdmin.Controller'
import { ProductAdminService } from '../service/ProductAdmin.Service'
import { CategoryModule } from 'src/categories/module/Category.Module'
import { CategoryService } from 'src/categories/service/Category.Service'
import { Category, CategorySchema } from 'src/categories/model/Category.Schema'


//đây là module của product
@Module({
    imports:
        [
            //import module của mongoose
            MongooseModule.forFeature(
                [
                    {
                        name: Product.name,
                        schema: ProductSchema
                    },
                    {
                        name: Category.name,
                        schema: CategorySchema
                    }
                ]
            ),
            CategoryModule
        ],
    controllers: [ProductController, ProductAdminController],
    providers: [ProductService, ProductAdminService, CategoryService],
})

//đây là module của product
export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerProduct)
            .forRoutes(ProductController)
    }
}