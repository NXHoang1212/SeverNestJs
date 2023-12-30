import { UserEntity } from 'src/user/entity/User.Entity';

export class RegisterRequestUser extends UserEntity {
  confirmPassword: string;
}
