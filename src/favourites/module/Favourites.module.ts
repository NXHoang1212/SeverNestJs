import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Favourites, FavouritesSchema } from '../model/Favourites.Model';
import { LoggerFavourites } from 'src/middleware/logger/Logger.Favourites';
import { FavouritesController } from '../controller/Favourites.controller';
import { FavouritesService } from '../service/Favourites.service';

//đây là module của product
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favourites.name, schema: FavouritesSchema },
    ]),
  ],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerFavourites).forRoutes(FavouritesController);
  }
}
