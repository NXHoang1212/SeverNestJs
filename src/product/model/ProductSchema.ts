import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//là một interface đại diện cho một document trong database
export type ProductDocument = Product & Document;

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

    @Prop()
    category: string;

    @Prop()
    quantity: number;
}


export const ProductSchema = SchemaFactory.createForClass(Product);