import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserToken } from '../../models/user-token';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/configs/api.config';
import { StorageService } from '../../services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  public login(
    email: string,
    password: string
  ): Observable<UserToken | { message; statusCode }> {
    return this._http
      .post<UserToken>(API_CONFIG.login.url(email, password), {
        email,
        password,
      })
      .pipe(
        map((response: UserToken) => response),
        catchError((error) => {
          const message: string = error.error.message;
          const statusCode: number = error.error.statusCode;
          return throwError({ message, statusCode });
        })
      );
  }

  public register(
    email: string,
    password: string,
    name: string,
    avatar: string
  ): Observable<UserToken> {
    return this._http
      .post<UserToken>(API_CONFIG.register.url(name, email, password, avatar), {
        email,
        password,
        name,
        avatar,
      })
      .pipe(
        map((response: UserToken) => response),
        catchError((_error) => {
          const error = _error.error.error;
          const message = _error.error.message;
          const statusCode: number = _error.error.statusCode;
          return throwError({ message, statusCode, error });
        })
      );
  }

  logout() {
    this._storageService.clearAll();
  }
}
