



import { ToppingEntity } from './../../entity/Topping.Entity';

export class GetToppingResponse {
    status: Boolean;
    message: String;
    data: ToppingEntity[];
}