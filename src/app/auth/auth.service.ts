import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

    return this.http.post<AuthResponseData>(this.url, signUpCredentials);
  }
}
