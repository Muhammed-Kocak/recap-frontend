import { Component, OnInit } from '@angular/core';
import { PageControlService } from 'src/app/services/pageControlService/page-control.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  truePage:boolean = false;

  constructor(private pageControlService:PageControlService) { }

  ngOnInit(): void {
  }

  whichPageControl() {
    if (this.pageControlService.whichPageControl("/home-page").valueOf()) {
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard").valueOf()) {
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard/brands/add").valueOf()){
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard/brands/:brandId").valueOf()){
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard/brands/getlist").valueOf()) {
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard/colors/getlist").valueOf()) {
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard/colors/add").valueOf()){
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard/colors/:colorId").valueOf()){
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard/cars/getlist").valueOf()) {
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard/cars/add").valueOf()){
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard/cars/update").valueOf()){
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard/cars/image/add").valueOf()){
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard/cars/image/getlist").valueOf()){
      return false;
    }else if (this.pageControlService.whichPageControl("/admin-dashboard/cars/image/update").valueOf()){
      return false;
    }else {
      return true;
    }
  }
}
