import * as mongoose from 'mongoose';

export class CartEntity {
    UserId: string;
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
            StatusProduct: string,
        }
    ]
}