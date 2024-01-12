import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRoles {
  Admin = 'admin',
  User = 'user',
}

//là một interface đại diện cho một document trong database
export type UserDocument = User & Document;

//là một class đại diện cho một bảng trong database
@Schema()
export class User {
  //phân quyền cho vai trò của một cột trong database
  @Prop({ type: String, enum: UserRoles, default: UserRoles.User })
  role: UserRoles;

  @Prop()
  googleId: string;

  @Prop()
  facebookId: string;

  @Prop()
  name: string;

  @Prop()
  holder: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  avatar: string;

  @Prop()
  mobile: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserChema = SchemaFactory.createForClass(User);

//reset password token mặc định là null
// @Prop({ default: null, required: false })
// resetOTP: string;
// @Prop()
// password: string;
