import { User } from "src/user/model/User.Schema";


export class OrderEntity {
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
    user: User;
    address: string;
    note: string;
    promo: string;
    date: Date;
    payment: string;
    TransactionId: string;
    status: string;
    statusPayment: string;
    reason: string;
}