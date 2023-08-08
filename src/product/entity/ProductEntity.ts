

//entity là một class đại diện cho một bảng trong database
//entity này sẽ được sử dụng để tương tác với database
import { Category } from 'src/categories/model/CategoryModel';

export class ProductEntity {
    name: string;
    price: number;
    description: string;
    image: string;
    category: Category;
    quantity: number;
}