import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

//là một interface đại diện cho một document trong database
export type SizeDocument = Size & Document;

//Schema
//là một class đại diện cho một bảng trong database
@Schema()
export class Size {
    @Prop()
    name: string;

    @Prop()
    price: number;
}


export const SizeSchema = SchemaFactory.createForClass(Size);