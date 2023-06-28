import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();
  private isUserLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable();
  private fullNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public fullName$ = this.fullNameSubject.asObservable();
  private profileImageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public profileImage$ = this.profileImageSubject.asObservable();
  private userIDSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public userID$ = this.userIDSubject.asObservable();

  constructor(private _storageService: StorageService, private _router: Router) {}

  get profileImage(): string {
    return this.profileImageSubject.value || this.decodedToken()?.fullName;
  }

  set profileImage(value: string) {
    this.profileImageSubject.next(value);
  }

  get isUserLoggedIn(): boolean {
    return this.isUserLoggedInSubject.value || this._storageService.getLocalStorage('isUserLoggedIn') === 'true';
  }

  set isUserLoggedIn(value: boolean) {
    this.isUserLoggedInSubject.next(value);
  }

  get isAdmin(): boolean {
    return this.isAdminSubject.value || this._storageService.getLocalStorage('isAdmin') === 'true';
  }

  set isAdmin(value: boolean) {
    this.isAdminSubject.next(value);
  }

  get fullName(): string {
    return this.fullNameSubject.value || this.decodedToken()?.fullName;
  }

  set fullName(value: string) {
    this.fullNameSubject.next(value);
  }

  get userID(): number {
    return this.userIDSubject.value || this.decodedToken()?.userID;
  }

  set userID(value: number) {
    this.userIDSubject.next(value);
  }

  decodedToken() {
    try {
      if (this.isUserLoggedIn) {
        const token = this._storageService.getLocalStorage('token');
        const _decodedToken: User = jwtDecode(token);
        this.fullName = `${_decodedToken?.firstName} ${_decodedToken?.lastName}`;
        this.profileImage = _decodedToken?.image;
        this.userID = _decodedToken?.id || this.userID;
        return { fullName: this.fullName, profileImage: this.profileImage, userID: this.userID };
      }
    } catch (error) {
      this.isUserLoggedIn = false;
      this.isAdmin = false;
      this._storageService.clearAll();
      this._router.navigate(['/']).then();
    }
  }
}

