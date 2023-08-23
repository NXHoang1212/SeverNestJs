import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/categories/model/Category.Model';
import { Size } from 'src/size/model/Size.Model';

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
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Size' })
    size: Size;
}


export const ProductSchema = SchemaFactory.createForClass(Product);