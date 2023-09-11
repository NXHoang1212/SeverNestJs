
import { UserEntity } from "src/user/entity/User.Entity";


export class LoginRequestUser extends UserEntity {
    otp: string;
}