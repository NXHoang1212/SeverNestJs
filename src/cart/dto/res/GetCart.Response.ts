
import { CategoryEntity } from "src/categories/entity/Category.Entity";


export class GetCategoryRespon {
    status: Boolean;
    message: String;
    data: CategoryEntity[];
}