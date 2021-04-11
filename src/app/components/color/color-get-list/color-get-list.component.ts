import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-get-list',
  templateUrl: './color-get-list.component.html',
  styleUrls: ['./color-get-list.component.css']
})
export class ColorGetListComponent implements OnInit {

  colors: Color[] = [];
  constructor(private colorService: ColorService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.toastrService.success("Renkler Getirildi");
      this.colors = response.data;
    }, responseError => {
      this.toastrService.error(responseError.error.message, "Renkler Getirilemedi")
    })
  }
}
