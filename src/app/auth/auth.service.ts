import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from './user-model';
import {Router} from '@angular/router';

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

  user = new BehaviorSubject<User>(null);

  private appKey = environment.googleKey;
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private appParams = new HttpParams().set('key', this.appKey);

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(userEmail: string, userPassword: string) {
    const signUpCredentials = this.getAuthCredentials(userEmail, userPassword);

    return this.http
      .post<AuthResponseData>(this.url + ':signUp', signUpCredentials, {params: this.appParams})
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
            this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
          }
        ));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
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
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }));
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

  logout() {
    this.user.next(null);
    this.router.navigate(['auth']);
  }
}
