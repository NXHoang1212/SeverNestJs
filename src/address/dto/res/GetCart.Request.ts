import { AddressEntity } from "src/address/entity/AddressEntity";



export class GetAddressRespon {
    status: Boolean;
    message: String;
    data: AddressEntity[];
}