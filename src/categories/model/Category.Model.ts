import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

//là một interface đại diện cho một document trong database
export type CategoryDocument = Category & Document;

//Schema
//là một class đại diện cho một bảng trong database
@Schema()
export class Category {
    @Prop()
    name: string;
}


export const CategorySchema = SchemaFactory.createForClass(Category);