import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategorySchema } from '../model/Category.Model'
import { CategoryController } from '../controller/Category.Controller'
import { CategoryService } from '../service/Category.Service'
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