import { CartEntity } from "src/cart/entity/Cart.Entity";



export class GetCartResponse {
    status: Boolean;
    message: String;
    data: CartEntity[];
}