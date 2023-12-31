import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/module/Product.Module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/module/User.Module';
import { MulterModule } from '@nestjs/platform-express'
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CategoryModule } from './categories/module/Category.Module';
import { AddressModule } from './address/module/AddRess.Module';

@Module({
  imports:
    [
      ConfigModule.forRoot({ envFilePath: '.env', }),
      MongooseModule.forRoot(process.env.MONGO_URI),
      //cho đường dẫn ảnh vào thư mục src/images ok
      MulterModule.register({ dest: './src/images' }),
      //gửi mail
      MailerModule.forRootAsync({
        useFactory: () => ({
          transport: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { user: process.env.SEND_MAIL, pass: process.env.SEND_MAIL_PASSWORD, },
          },
          defaults: { from: '"No Reply" <no-reply@gmail.com>' },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(),
            options: { strict: true, },
          },
        }),
      }),
      ProductModule, UserModule, CategoryModule, AddressModule
    ],
  controllers: [AppController], //điều khiển các request
  providers: [AppService], // xử lý logic database crud
})
export class AppModule { }
