import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { PageControlService } from 'src/app/services/pageControlService/page-control.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  manager:boolean=false;

  userDetail$: Observable<UserDetail | undefined> = this.authService
    .userDetail$;

  pages:string[]=["/home-page","/admin-dashboard","brands/add","brands/update:brandId","brands/getlist",]

  title: string = 'Rent A Car';


  constructor(private authService: AuthService, private pageControlService: PageControlService,private localStorageService:LocalStorageService) {
  }

  ngOnInit(): void {
    this.managerLogin();
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

  managerLogin(){
    if (this.authService.managerLoggedIn()) {
      this.manager=true;
    }else{
      this.manager=false;
    }
  }
}
