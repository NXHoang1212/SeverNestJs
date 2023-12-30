import { CategoryEntity } from 'src/categories/entity/Category.Entity';
export class GetCategoryRespon {
  status: boolean;
  message: string;
  data: CategoryEntity[];
}
