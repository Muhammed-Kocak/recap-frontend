export interface RentalDto{
    rentalDtoId:number;
    brandName:string;
    firstName:string;
    lastName:string;
    rentDate:Date;
    returnDate?:Date;
}