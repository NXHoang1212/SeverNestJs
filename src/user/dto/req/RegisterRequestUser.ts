import { UserEntity } from "src/user/entity/UserEntity";

export class RegisterRequestUser extends UserEntity {
    confirmPassword: string;
}   