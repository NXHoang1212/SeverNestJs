import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type BannerDocument = Banner & Document;

@Schema()
export class Banner {

    @Prop()
    name: string;

    @Prop()
    image: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}


export const BannerSchema = SchemaFactory.createForClass(Banner);