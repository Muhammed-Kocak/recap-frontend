import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageControlService {

  constructor() { }

  whichPageControl(path:string):boolean{
    let control = window.location.pathname.includes(path);
    if (control===true) {
       return true;
    }else{
       return false;
    }
 }
}
