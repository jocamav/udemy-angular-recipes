import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    this.error = null;

    if (this.isLoginMode) {

    } else {
      this.signUp(email, password);
    }

    form.reset();
  }

  private signUp(email, password) {
    this.authService.signUp(email, password)
      .subscribe(responseData => {
          console.log(responseData);
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.error = 'An error occurred!';
        });
  }
}
