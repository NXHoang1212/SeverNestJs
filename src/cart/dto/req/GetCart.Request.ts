

export class GetCartRequest {   
    UserId: string;
    ProductId: [
        {
            NameProduct: string,
            PriceProduct: number,
            QuantityProduct: number,
            ToppingProduct: string[],
            SizeProduct: string[],
            NoteProduct: string,
        }
    ]
}