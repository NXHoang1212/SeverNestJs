import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Promotion, PromotionSchema } from '../model/PromotionSchema'
import { PromotionUserController } from '../controller/Promotion.User.Controller'
import { PromotionUserService } from '../service/Promotion.User.Service'
import { LoggerPromotion } from 'src/middleware/logger/Logeer.Promotion'
import { PromotionAdminController } from '../controller/Promotion.Admin.Controller'
import { PromotionAdminService } from '../service/Promotion.Admin.Service'
import { MulterModule } from '@nestjs/platform-express'

@Module({
    imports:
        [
            MongooseModule.forFeature([{ name: Promotion.name, schema: PromotionSchema }]),
        ],
    controllers: [PromotionUserController, PromotionAdminController],
    providers: [PromotionUserService, PromotionAdminService],
})

export class PromotionModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerPromotion)
            .forRoutes(PromotionUserController, PromotionAdminController)
    }
}