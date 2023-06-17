import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuardGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(): boolean {
    if (this._userService.isUserLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']).then();
      return false;
    }
  }
}
