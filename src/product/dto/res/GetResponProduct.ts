import { ProductEntity } from "../../entity/ProductEntity";

export interface GetProductRespon {
    status: boolean;
    message: string;
    // Cập nhật kiểu dữ liệu ở đây
    data: ProductEntity[];
}
