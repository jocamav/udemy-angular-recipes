import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {environment} from '../../environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  appKey = environment.googleKey;
  url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  appParams = new HttpParams().set('key', this.appKey);

  constructor(private http: HttpClient) { }

  signUp(userEmail: string, userPassword: string) {
    const signUpCredentials = this.getAuthCredentials(userEmail, userPassword);

    return this.http
      .post<AuthResponseData>(this.url + ':signUp', signUpCredentials, {params: this.appParams})
      .pipe(catchError(this.handleError));
  }

  private getAuthCredentials(userEmail: string, userPassword: string) {
    const signUpCredentials = {
      email: userEmail,
      password: userPassword,
      returnSecureToken: true
    };
    return signUpCredentials;
  }

  signIn(userEmail: string, userPassword: string) {
    const signUpCredentials = this.getAuthCredentials(userEmail, userPassword);

    return this.http
      .post<AuthResponseData>(this.url + ':signInWithPassword', signUpCredentials, {params: this.appParams})
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let message = 'An error occurred!';

    if (errorResponse.error && errorResponse.error.error) {
      const errorCode = errorResponse.error.error.message;
      switch (errorCode) {
        case 'EMAIL_EXISTS':
          message = 'This mail is already registered';
          break;
        case 'EMAIL_NOT_FOUND':
          message = 'Wrong credentials (email)!';
          break;
        case 'INVALID_PASSWORD':
          message = 'Wrong credentials (password)!';
          break;
      }
    }
    return throwError(message);
  }
}
