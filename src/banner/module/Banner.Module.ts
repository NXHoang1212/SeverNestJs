import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LoggerBanner } from 'src/middleware/logger/Logger.Banner'
import { Banner, BannerSchema } from '../model/Banner.Schema'
import { BannerAdminController } from '../controller/Admin.Banner.Controller'
import { BannerUsersController } from '../controller/User.Banner.Controller'
import { BannerAdminService } from '../service/Banner.Admin.Service'
import { BannerUsersService } from '../service/Banner.Users.Service'

@Module({
    imports:
        [
            MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),

        ],
    controllers: [BannerAdminController, BannerUsersController],
    providers: [BannerAdminService, BannerUsersService],
})

//đây là module của product
export class BannerModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerBanner)
            .forRoutes(BannerAdminController, BannerUsersController)
    }
}