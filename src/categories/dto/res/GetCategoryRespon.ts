
import { CategoryEntity } from "src/categories/entity/CategoryEntity";


export class GetCategoryRespon {
    status: Boolean;
    message: String;
    data: CategoryEntity[];
}