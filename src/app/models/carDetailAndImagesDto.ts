import { CarDto } from "./carDto";
import { CarImage } from "./carImage";

export interface CarDetailAndImagesDto{
    car:CarDto,
    carImages:CarImage[]
}