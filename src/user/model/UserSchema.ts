
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//là một interface đại diện cho một document trong database
export type UserDocument = User & Document;

//là một class đại diện cho một bảng trong database
@Schema()
export class User {
    @Prop()
    fullname: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: null })
    avatar: string;

    @Prop()
    mobile: string;

    @Prop()
    gender: string;

    @Prop()
    nickname: string;

    @Prop()
    birthday: string;

    //reset password token mặc định là null
    @Prop({ default: null, required: false })
    resetOTP: string;

    //sinh ra createAt và updateAt mặc định
    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

}


export const UserChema = SchemaFactory.createForClass(User);