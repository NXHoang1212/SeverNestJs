import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/categories/model/Category.Model';

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

    //trong size sẽ có nhiều name và price trong bảng size
    @Prop()
    size:
        [
            {
                name: string,
                price: string
            }
        ]

    @Prop()
    topping:
        [
            {
                name: string,
                price: string
            }
        ]
}


export const ProductSchema = SchemaFactory.createForClass(Product);