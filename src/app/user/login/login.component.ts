import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Auth } from '../entities/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    fb: FormBuilder) {
    this.loginForm = fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
   }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.router.navigateByUrl('/');
    }
  }

  login() {
    let user = new User(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value
      )
    this.authService.login(user).subscribe(
      res => {
        debugger;
        this.authService.setToken(res.accessToken);
        this.router.navigateByUrl('/');
      }, err => {
        this.toastr.error(err.error.message)
      })
  }



}
