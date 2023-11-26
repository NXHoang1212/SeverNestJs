import mongoose from "mongoose";

export class GetCartRequest {   
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