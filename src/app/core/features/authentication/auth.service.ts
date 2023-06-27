import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/configs/api.config';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { ADMINS_LIST } from '../../constants/adminsList.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _storageService: StorageService,
    private _router: Router,
    private _userService: UserService
  ) {}

  public login(username: string, password: string) {
    // customer
    // "username": "atuny0"
    // "password": "9uQFF1Lh"
    // admin
    // "username": "acharlota",
    // "password": "M9lbMdydMN",
    return this._http
      .post<User>(API_CONFIG.login.url(username, password), {
        username,
        password
      })
      .pipe(
        tap(user => {
          if (user) {
            this._userService.isUserLoggedIn = true;
            this._storageService.setLocalStorage('token', user.token);
            this._storageService.setLocalStorage('isUserLoggedIn', JSON.stringify(this._userService.isUserLoggedIn));
            this._storageService.setLocalStorage('isAdmin', JSON.stringify(ADMINS_LIST.includes(user.username)));
            this._userService.isAdmin = ADMINS_LIST.includes(user.username);
            this._userService.userID = user.id;
            this._userService.fullName = `${user.firstName} ${user.lastName}`;
            this._userService.profileImage = user.image;
            return;
          }
        })
      );
  }

  logout() {
    this._storageService.clearAll();
    this._userService.isUserLoggedIn = false;
    this._userService.isAdmin = false;
    this._router.navigate(['/']).then();
  }
}
