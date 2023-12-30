import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../model/Category.Schema';
import { CategoryAdminController } from '../controller/Category.admin.Controller';
import { CategoryService } from '../service/Category.Service';
import { LoggerCategory } from 'src/middleware/logger/Logger.Category';
import { CategoryUserController } from '../controller/Category.users.Controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryAdminController, CategoryUserController],
  providers: [CategoryService],
})

//đây là module của product
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerCategory).forRoutes(CategoryAdminController);
  }
}
