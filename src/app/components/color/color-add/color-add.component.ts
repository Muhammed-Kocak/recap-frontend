import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators ,FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private toastrService: ToastrService,private colorService:ColorService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    })
  }

  add() {
    let colorModel = Object.assign({}, this.colorAddForm.value);
    console.log(colorModel)
    if (this.colorAddForm.valid) {
      this.colorService.add(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.messages, 'Başarılı');
          window.location.reload();
        },
        (responseError) => {
          console.log(responseError)
          for (
            let i = 0;
            i < responseError.error.Errors.length;
            i++
          ) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Doğrulama Hatası'
            );
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat!');
    }
  }
}
