import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

   title: string = 'Renkler';
   listAllColorCss: string = 'text-start list-group-item';
   colors: Color[] = [];
   currentColorId: number = 0;
   filterText = '';

   constructor(private colorService: ColorService) {
   }

   ngOnInit(): void {
      this.getColors();
   }

   getColors() {
      this.colorService.getColors().subscribe((response) => {
         this.colors = response.data;
      });
   }

   setCurrentColor(colorId: number) {
      this.currentColorId = colorId;
   }

   getCurrentColorClass(colorId: number): string {
      if (this.currentColorId == colorId) {
         return 'list-group-item list-group-item-action active';
      }

      return 'list-group-item list-group-item-action';
   }

   resetCurrentColor(){
      this.currentColorId = 0
   }
   removeCurrentColor(){
      this.filterText = "";
      this.currentColorId=0;
    }
}
