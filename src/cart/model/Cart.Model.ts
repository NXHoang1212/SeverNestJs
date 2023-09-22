import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';


export type CartDocument = Cart & Document;


@Schema()
export class Cart {

    @Prop()
    NameProduct: string;

    @Prop()
    PriceProduct: number;

    @Prop()
    SizeProduct: string;

    @Prop()
    ToppingProduct: string;

    @Prop()
    QuantityProduct: number;

    @Prop()
    NoteProduct: string;

    @Prop()
    AmountShipping: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    UserId: string;
}


export const CartSchema = SchemaFactory.createForClass(Cart);