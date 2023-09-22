import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/model/User.Schema';

//là một interface đại diện cho một document trong database
export type AddressDocument = Address & Document;

//Schema
//là một class đại diện cho một bảng trong database
@Schema()
export class Address {
    @Prop()
    name: string;

    @Prop()
    DescribeAddRess: string;

    @Prop()
    Other: string;

    @Prop()
    Gate: string;

    @Prop()
    NoteOrther: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop()
    username: string;

    @Prop()
    phone: string;

}


export const AddressSchema = SchemaFactory.createForClass(Address);