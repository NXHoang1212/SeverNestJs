import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategorySchema } from '../model/Cart.Model'
import { CategoryController } from '../controller/Cart.Controller'
import { CategoryService } from '../service/Cart.Service'
import { LoggerCategory } from 'src/middleware/logger/Logger.Category'



//đây là module của product
@Module({
    imports:
        [
            MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),

        ],
    controllers: [CategoryController],
    providers: [CategoryService],
})

//đây là module của product
export class CategoryModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerCategory)
            .forRoutes(CategoryController)
    }
}