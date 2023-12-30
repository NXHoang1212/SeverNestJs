import { User } from 'src/user/model/User.Schema';
import { Product } from 'src/product/model/Product.Schema';

export class FavouritesEntity {
  UserId: User;
  ProductId: Product;
  status: string;
}
