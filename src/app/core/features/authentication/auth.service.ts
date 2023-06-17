import { Injectable } from '@angular/core';
import { catchError, map, switchMap, throwError } from 'rxjs';
import { UserToken } from '../../models/user-token';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/configs/api.config';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _storageService: StorageService,
    private _router: Router,
    private _userService: UserService
  ) {}

  public login(email: string, password: string) {
    return this._http
      .post<UserToken>(API_CONFIG.login.url(email, password), {
        email,
        password,
      })
      .pipe(
        switchMap((loginResponse: UserToken) => {
          const accessToken = loginResponse.access_token;
          return this._http
            .get<UserToken>(API_CONFIG.profile.url, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .pipe(
              map((profileResponse: any) => {
                this._storageService.setLocalStorage(
                  'accessToken',
                  loginResponse.access_token
                );
                this._storageService.setLocalStorage(
                  'name',
                  profileResponse.name
                );
                this._storageService.setLocalStorage(
                  'role',
                  profileResponse.role
                );
                this._storageService.setLocalStorage(
                  'email',
                  profileResponse.email
                );
                this._storageService.setLocalStorage(
                  'avatar',
                  profileResponse.avatar
                );
                this._userService.isLoggedUser$.next(true);
              })
            );
        }),
        catchError((error) => {
          const message: string = error.error.message;
          const statusCode: number = error.error.statusCode;
          this._userService.isLoggedUser$.next(false);
          console.log(this._userService.isLoggedUser$.value);
          return throwError({ message, statusCode });
        })
      );
  }

  public register(
    email: string,
    password: string,
    name: string,
    avatar: string
  ) {
    return this._http
      .post<UserToken>(API_CONFIG.register.url(name, email, password, avatar), {
        email,
        password,
        name,
        avatar,
      })
      .pipe(
        switchMap((loginResponse: UserToken) => {
          const accessToken = loginResponse.access_token;
          return this._http
            .get<UserToken>(API_CONFIG.profile.url, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .pipe(
              map((profileResponse: any) => {
                this._storageService.setLocalStorage(
                  'accessToken',
                  loginResponse.access_token
                );

                this._storageService.setLocalStorage(
                  'name',
                  profileResponse.name
                );
                this._storageService.setLocalStorage(
                  'role',
                  profileResponse.role
                );
                this._storageService.setLocalStorage(
                  'email',
                  profileResponse.email
                );
                this._storageService.setLocalStorage(
                  'avatar',
                  profileResponse.avatar
                );
              })
            );
        }),
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
    this._userService.isLoggedUser$.next(false);
    this._router.navigate(['/']).then();
  }
}
