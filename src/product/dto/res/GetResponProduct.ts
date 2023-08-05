import { ProductEntity } from "../../entity/ProductEntity";

export class GetProductRespon {
    status: Boolean;
    message: String;
    //data là một mảng các đối tượng ProductEntity
    data: ProductEntity[];
}