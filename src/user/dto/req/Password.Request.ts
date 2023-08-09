//đây là model gửi đi
import { UserEntity } from "src/user/entity/User.Entity";

export class ForgotPasswordRequest extends UserEntity {
    otp: string;
    confirmPassword: string;
}