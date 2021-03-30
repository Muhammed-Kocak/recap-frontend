import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import {FormGroup,FormBuilder,FormControl,
Validators,
} from '@angular/forms';
import { ColorService } from 'src/app/services/colorService/color.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colors: Color[] = [];
  colorName: Color;
  colorId: Color;
  colorUpdateForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getColorById(params['colorId']);
      }
    });
    this.createColorUpdateForm();
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [this.colorId, Validators.required],
      colorName: [this.colorName, Validators.required],
    });
  }

  getColorById(colorId: number) {
    this.colorService.getColorById(colorId).subscribe((response) => {
      this.colors = response.data;
      Object.keys(this.colors).forEach((c: any) => {
        if (c === 'colorId') {
          this.colorId = this.colors[c];
        } else {
          this.colorName = this.colors[c];
        }
      });
      this.createColorUpdateForm();
    });
  }

  update() {
    console.log(this.colorUpdateForm.value)
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe((response) => {
        this.toastrService.success(response.messages, 'Başarılı');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      (responseError) => {
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası");
          }
        }
      });
    }
  }
}
