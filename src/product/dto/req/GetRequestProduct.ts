
import { ProductEntity } from "../../entity/ProductEntity";

export class GetProductRequest {
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    quantity: number;
}  