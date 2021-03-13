import { CarDto } from "./carDto";
import { ResponseModel } from "./responseModel";

export interface CarDtoResponseModel extends ResponseModel{
    data:CarDto[],
}