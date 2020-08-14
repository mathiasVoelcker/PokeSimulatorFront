import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../entities/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../entities/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {

  signUpForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    fb: FormBuilder) {
      this.signUpForm = fb.group({
        username: [null, Validators.required],
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
      })
    }

  signUp() {
    this.isLoading = true;
    let user = new User(
      this.signUpForm.get('username').value,
      this.signUpForm.get('password').value
      )
    this.authService.signUp(user).subscribe(
      (response) => {
        this.login(user);
      }, 
      (error) => {
        this.toastr.error(error.error.message)
        this.isLoading = false;
      }
    );
  }

  login(user: User) {
    this.authService.login(user).subscribe(
      res => {
        this.authService.setToken(res.accessToken);
        this.router.navigateByUrl('/');
      })
  }

  validatePassword() {
    return this.signUpForm.get('password').value === this.signUpForm.get('confirmPassword').value
      || !this.signUpForm.get('password').dirty
      || !this.signUpForm.get('confirmPassword').dirty
  }

  validateForm() {
    return this.signUpForm.valid && this.validatePassword();
  }

}
