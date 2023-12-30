import { CartEntity } from 'src/cart/entity/Cart.Entity';

export class GetCartResponse {
  status: boolean;
  message: string;
  data: CartEntity[];
}
