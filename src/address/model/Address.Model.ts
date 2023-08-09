import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

//là một interface đại diện cho một document trong database
export type AddressDocument = Address & Document;

//Schema
//là một class đại diện cho một bảng trong database
@Schema()
export class Address {
    @Prop()
    name: string;
}


export const AddressSchema = SchemaFactory.createForClass(Address);