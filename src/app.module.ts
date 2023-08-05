import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/module/ProductModule';


@Module({
  imports:
    [
      MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.fah7pgm.mongodb.net/Nest?retryWrites=true&w=majority'),
      ProductModule

    ],
  controllers: [AppController], //điều khiển các request
  providers: [AppService], // xử lý logic database crud
})
export class AppModule { }
