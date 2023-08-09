import { ProductEntity } from "../../entity/Product.Entity";

export interface GetProductResponse {
    status: boolean;
    message: string;
    // Cập nhật kiểu dữ liệu ở đây
    data: ProductEntity[];
}
