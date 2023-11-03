import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    UserId: string;

    @Prop()
    ProductId: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId },
            ProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            NameProduct: string,
            PriceProduct: number,
            QuantityProduct: number,
            ToppingProduct: string[],
            SizeProduct: string[],
            NoteProduct: string,
        }
    ]
}

export const CartSchema = SchemaFactory.createForClass(Cart);
