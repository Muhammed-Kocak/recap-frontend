import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this.toastrService.warning("Yine bekleriz..")
    setTimeout(() => { this.authService.logout();  }, 500);
    setTimeout(() => { this.router.navigate(['']);  }, 800);
  }
}
