import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

//là một interface đại diện cho một document trong database
export type ProductDocument = Product & Document;

//Schema
//là một class đại diện cho một bảng trong database
@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

    @Prop()
    image: string;

    //tham chiếu đến bảng category
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'category' })
    category: string;

    @Prop()
    quantity: number;
}


export const ProductSchema = SchemaFactory.createForClass(Product);