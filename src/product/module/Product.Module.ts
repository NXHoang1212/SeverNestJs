import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductUserController } from '../controller/ProductUsers.Controller';
import { ProductService } from '../service/Product.Service';
import { Product, ProductSchema } from '../model/Product.Schema';
import { LoggerProduct } from '../../middleware/logger/Logger.Product';
import { ProductAdminController } from '../controller/ProductAdmin.Controller';
import { ProductAdminService } from '../service/ProductAdmin.Service';
import { CategoryModule } from 'src/categories/module/Category.Module';
import { CategoryService } from 'src/categories/service/Category.Service';
import { Category, CategorySchema } from 'src/categories/model/Category.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
    CategoryModule,
  ],
  controllers: [ProductUserController, ProductAdminController],
  providers: [ProductService, ProductAdminService, CategoryService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerProduct)
      .forRoutes(ProductUserController, ProductAdminController);
  }
}
