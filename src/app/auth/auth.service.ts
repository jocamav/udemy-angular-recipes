import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1HHjPEVqO5WJ5288nTwukewdCOAl0nCo';

  constructor(private http: HttpClient) { }

  signUp(userEmail: string, userPassword: string) {
    const signUpCredentials = {
      email: userEmail,
      password: userPassword,
      returnSecureToken: true
    };

    return this.http
      .post<AuthResponseData>(this.url, signUpCredentials)
      .pipe(catchError(errorResponse => {
        const message = this.getErrorMessage(errorResponse);
        return throwError(message);
      }));
  }

  private getErrorMessage(errorResponse): string {
    let message = 'An error occurred!';

    if (errorResponse.error && errorResponse.error.error) {
      const errorCode = errorResponse.error.error.message;
      switch (errorCode) {
        case 'EMAIL_EXISTS':
          message = 'This mail is already registered';
      }
    }
    return message;
  }
}
