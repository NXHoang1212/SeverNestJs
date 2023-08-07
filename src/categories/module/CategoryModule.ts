import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategorySchema } from '../model/CategoryModel'
import { CategoryController } from '../controller/CategoryController'
import { CategoryService } from '../service/CategoryService'
import { LoggerCategory } from 'src/middleware/logger/LoggerCategory'



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
export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerCategory)
            .forRoutes(CategoryController)
    }
}