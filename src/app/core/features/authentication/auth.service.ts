import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserToken } from '../../models/user-token';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/configs/api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  public login(email: string, password: string): Observable<UserToken> {
    return this._http
      .post<UserToken>(API_CONFIG.login.url(email, password), {
        email,
        password,
      })
      .pipe((res) => res);
  }
}
