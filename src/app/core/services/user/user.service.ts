import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();
  private isUserLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable();

  constructor(private _storageService: StorageService) {}

  setUser(user: any) {
    this.userSubject.next(user);
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
  }

  getUser() {
    return this.userSubject.value;
  }

  getIsAdmin() {
    return this.isAdminSubject.value;
  }

  userName() {
    return this._storageService.getLocalStorage('firstName') + ' ' + this._storageService.getLocalStorage('lastName');
  }

  profileImg() {
    return this._storageService.getLocalStorage('image');
  }

  setLoggedIn(isLoggedIn: boolean) {
    this.isUserLoggedInSubject.next(isLoggedIn);
  }

  getLoggedIn() {
    return this.isUserLoggedInSubject.value;
  }
}
