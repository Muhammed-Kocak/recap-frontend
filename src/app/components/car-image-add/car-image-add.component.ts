import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/carImageService/car-image.service';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit {

  imageBaseUrl = "https://localhost:44332/Images/";
  carImages:CarImage[]=[];
  addImageForm:FormGroup;
  currentCarId:number;
  currentFile:File | null;

  constructor(
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService,
  ) { }

  ngOnInit(): void {
    this.createAddImageForm();
    this.activatedRoute.params.subscribe(params=>{
      this.getCarImages(params["carId"]);
      this.currentCarId = params["carId"];
    })
  }

  onFileChange(event:any){
    if (event.target.files.length > 0) {
      this.currentFile = event.target.files[0];
    }
  }

  addImage(carId:number){
    if(this.currentFile){
      const formData = new FormData();
      formData.append('CarId', carId.toString())
      formData.append('Image', this.currentFile)
      this.carImageService.add(formData).subscribe( response => {
        this.toastrService.success("Resim Eklendi.")
        this.getCarImages(carId)
        this.addImageForm.reset()
      }, responseError => {
        console.log(responseError)
        this.toastrService.error(responseError.error.Message,"Hata!")
      })
    }
  }

  deleteImage(carImage:CarImage){
    this.carImageService.delete(carImage).subscribe(response=>{
      this.toastrService.info(response.message,"Başarılı!")
      this.getCarImages(carImage.carId)
    });
  }
  
  getCarImages(id:number){
    this.carImageService.getPhotosByCarId(id).subscribe(response=>{
      this.carImages = response.data;
    });  
  }

  createAddImageForm(){
    this.addImageForm = this.formBuilder.group({
      Image: ["", Validators.required],
    });
  }
 

}
