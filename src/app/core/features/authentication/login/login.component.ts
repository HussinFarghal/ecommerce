import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserToken } from '../../../models/user-token';
import { catchError, tap, throwError } from 'rxjs';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessages: string[] = [];

  constructor(
    private _authService: AuthService,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }

  public login() {
    const { username, password } = this.loginForm.value;
    this._authService
      .login(username, password)
      .pipe(
        tap((response: UserToken) => {
          this._storageService.setLocalStorage('token', response.access_token);
          this._storageService.setLocalStorage(
            'refresh_token',
            response.refresh_token
          );
        }),
        catchError((error) => {
          console.log('error =', error);
          // Handle the error as needed
          return throwError(error);
        })
      )
      .subscribe();
  }

  public register() {
    const { username, password } = this.loginForm.value;
    this._authService
      .register(username, password, '', '')
      .pipe(
        tap((response: UserToken) => {
          console.log('response =', response);
        }),
        catchError((error) => {
          this.errorMessages = error.message;
          return throwError(error);
        })
      )
      .subscribe();
  }

  // public register() {
  //   const { username, password } = this.loginForm.value;
  //   this._authService.register(username, password, '', '').subscribe(
  //     (response: UserToken) => {
  //       console.log('response=', response);
  //     },
  //     (error) => {
  //       console.log('error =', error);
  //       console.log('error.message =', error.message);
  //       this.errorMessages = error.message;
  //     }
  //   );
  // }
}
