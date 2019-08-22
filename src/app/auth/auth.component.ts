import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService, private router: Router) { }

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

    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.login(email, password);
    } else {
      authObservable = this.signUp(email, password);
    }
    this.handleResponse(authObservable);
    form.reset();
  }

  private signUp(email, password) {
    return this.authService.signUp(email, password);
  }

  private login(email, password) {
    return this.authService.signIn(email, password);
  }

  private handleResponse(response: Observable<AuthResponseData>) {
    response
      .subscribe(responseData => {
        console.log(responseData);
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      });
  }
}
