import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { StorageService } from '../services/storage/storage.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardGuard implements CanActivate {
  private _isUserLoggedIn: boolean;
  private _isAdmin: Observable<boolean> | boolean;

  constructor(private _userService: UserService, private _router: Router, private _storageService: StorageService) {}

  canActivate(): boolean {
    this._isUserLoggedIn = this._userService.isUserLoggedIn;
    this._userService.isUserLoggedIn$.subscribe(
      isUserLoggedIn => (this._isUserLoggedIn = isUserLoggedIn || this._storageService.getLocalStorage('isUserLoggedIn') === 'true')
    );
    this._isAdmin = this._userService.isAdmin;
    this._userService.isAdmin$.subscribe(
      isAdmin => (this._isAdmin = of(isAdmin) || this._storageService.getLocalStorage('isAdmin') === 'true')
    );
    if (this._isUserLoggedIn && this._isAdmin) {
      return true;
    } else {
      this._storageService.clearAll();
      this._router.navigate(['/']).then();
      return false;
    }
  }
}
