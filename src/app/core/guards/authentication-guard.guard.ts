import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router, private _storageService: StorageService) {}

  canActivate(): boolean {
    if (this._userService.getLoggedIn()) {
      return true;
    } else {
      this._storageService.clearAll();
      this._router.navigate(['/login']).then();
      return false;
    }
  }
}
