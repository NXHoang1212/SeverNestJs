

//entity là một class đại diện cho một bảng trong database
//entity này sẽ được sử dụng để tương tác với database
import { Category } from 'src/categories/model/Category.Model';


export class ProductEntity {
    name: string;
    price: number;
    description: string;
    image: string;
    category: Category;
    size:
        [
            {
                name: string,
                price: string
            }
        ];
    topping:
        [
            {
                name: string,
                price: string
            }
        ];
}