import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/model/User.Schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {

    @Prop({ type: Array })
    OrderCart: [
        {
            NameProduct: string,
            PriceProduct: number, 
            QuantityProduct: number,
            ToppingProduct: string[],
            SizeProduct: string[],
            NoteProduct: string,
        }
    ]

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: String })
    address: string;

    @Prop({ type: String })
    note: string;

    @Prop({ type: String, default: null })
    promo: string;

    @Prop({ type: Date, default: Date.now })
    date: Date;

    @Prop({ type: String })
    payment: string

    @Prop({ type: String })
    TransactionId: string

    @Prop({ type: String })
    status: string;

    @Prop({ type: String })
    statusPayment: string;

    @Prop({ type: String, default: null })
    reason: string;

}
export const OrderSchema = SchemaFactory.createForClass(Order);