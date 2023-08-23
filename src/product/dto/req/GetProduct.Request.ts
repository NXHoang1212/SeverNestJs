
import { ProductEntity } from "../../entity/Product.Entity";

export class GetProductRequest {
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    size: string;
}  