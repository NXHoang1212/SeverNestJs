import { AddressEntity } from "src/address/entity/AddressEntity";



export class GetAddressResponse {
    status: Boolean;
    message: String;
    data: AddressEntity[];
}