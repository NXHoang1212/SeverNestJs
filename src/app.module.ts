import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/module/ProductModule';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/module/UserModule';
import { MulterModule } from '@nestjs/platform-express'
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports:
    [
      ConfigModule.forRoot({ envFilePath: '.env', }),
      MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.fah7pgm.mongodb.net/Nest?retryWrites=true&w=majority'),
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
      ProductModule, UserModule
    ],
  controllers: [AppController], //điều khiển các request
  providers: [AppService], // xử lý logic database crud
})
export class AppModule { }
