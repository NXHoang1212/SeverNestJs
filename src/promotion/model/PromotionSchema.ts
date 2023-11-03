import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/model/User.Schema';

export type PromotionDocument = Promotion & Document;


@Schema()
export class Promotion {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    UserId: User;

    @Prop({ required: true })
    Tilte: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    nameQR: Buffer;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    start: string;

    @Prop({ required: true })
    end: string;

    @Prop({ required: true })
    status: string;

}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
