import { Category } from 'src/categories/model/Category.Schema';

export class ProductEntity {
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  size: [
    {
      name: string;
      price: string;
    },
  ];
  topping: [
    {
      name: string;
      price: string;
    },
  ];
}
