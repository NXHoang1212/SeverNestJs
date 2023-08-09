import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "../service/User.Service";
import { UserController } from "../controller/User.Controller";
import { User, UserChema } from "../model/User.Schema";
import { LoggerUser } from "src/middleware/logger/Logger.User";
import { JwtModule } from "@nestjs/jwt";
import { ScheduleModule } from "@nestjs/schedule";
import { ClearExpiredOTPService } from "src/utils/task/ClearTimeOTP";

@Module({
    imports:
        [
            MongooseModule.forFeature([{ name: User.name, schema: UserChema }]),
            JwtModule.register({ global: true, secret: 'hello', signOptions: { expiresIn: '60s' } }),
            ScheduleModule.forRoot()
        ],
    controllers: [UserController],
    providers: [UserService],
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerUser)
            .forRoutes(UserController);
    }
}
