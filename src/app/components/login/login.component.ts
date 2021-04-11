import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  passwordHidden: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    console.log(
      this.loginForm.valid)
    console.log(
      this.loginForm.value
    );

    if (!this.loginForm.valid) {
      this.toastrService.warning("Form boş bırakılamaz")
      return;
    }
    
    let loginModel: LoginModel = { ...this.loginForm.value };
    

    this.authService.login(loginModel).subscribe(
      (response) => {
        this.localStorageService.set('token', response.data.token);
        this.localStorageService.set(
          'userMail',
          this.loginForm.get('email')?.value
        );
        this.getUserDetailByEmail(this.loginForm.get('email')?.value);
        this.toastrService.info(response.message);
        this.router.navigateByUrl('');
      },
      (errorResponse) => {
        console.log(errorResponse)
        this.toastrService.error(errorResponse.error.Message)}
    );
  }

  getUserDetailByEmail(mail: string) {
    this.userService.getUserDetailByEmail(mail).subscribe((response) => {
      this.authService.setUserDetail(response.data);
    });
  }

  togglePasswordHidden() {
    this.passwordHidden = !this.passwordHidden;
  }

  isPasswordHidden(): string {
    return this.passwordHidden ? 'password' : 'text';
  }

  isPasswordHiddenIcon(): string {
    return this.passwordHidden ? 'fa-eye-slash' : 'fa-eye text-primary';
  }
}