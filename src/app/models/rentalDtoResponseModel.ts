import { RentalDto } from "./rentalDto";
import { ResponseModel } from "./responseModel";

export interface RentalDtoResponseModel extends ResponseModel{
    data:RentalDto[],
}