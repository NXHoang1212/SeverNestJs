import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/model/User.Schema';
import { Product } from 'src/product/model/Product.Schema';

export type FavouritesDocument = Favourites & Document;

@Schema()
export class Favourites {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    UserId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    ProductId: Product;

    @Prop()
    status: string;

}

export const FavouritesSchema = SchemaFactory.createForClass(Favourites);
