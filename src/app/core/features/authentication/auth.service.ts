import { Injectable } from '@angular/core';
import { map } from 'rxjs';
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
    // "username": "aeatockj"
    // "password": "szWAG6hc"
    // admin
    // "username": "ckensleyk",
    // "password": "tq7kPXyf",
    return this._http
      .post<User>(API_CONFIG.login.url(username, password), {
        username,
        password
      })
      .pipe(
        map(user => {
          if (ADMINS_LIST.includes(user.username)) {
            this._userService.setIsAdmin(true);
          } else {
            this._userService.setIsAdmin(false);
          }
          this._storageService.setLocalStorage('id', JSON.stringify(user.id));
          this._storageService.setLocalStorage('firstName', user.firstName);
          this._storageService.setLocalStorage('lastName', user.lastName);
          this._storageService.setLocalStorage('gender', user.gender);
          this._storageService.setLocalStorage('image', user.image);
          this._storageService.setLocalStorage('token', user.token);
          this._storageService.setLocalStorage('isAdmin', JSON.stringify(this._userService.getIsAdmin()));
          this._userService.setUser(user);
          this._userService.setLoggedIn(true);
          return user;
        })
      );
  }

  logout() {
    this._storageService.clearAll();
    this._userService.setLoggedIn(false);
    this._userService.setUser(null);
    this._router.navigate(['auth']).then();
  }
}
