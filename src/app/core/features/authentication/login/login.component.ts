import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StorageService } from '../../../services/storage/storage.service';
import { Router } from '@angular/router';

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
    private _storageService: StorageService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }

  public login() {
    const { username, password } = this.loginForm.value;
    this._authService.login(username, password).subscribe(
      (response) => {
        this._router.navigate(['/']).then();
      },
      (error) => {
        console.log('error =', error);
      }
    );
  }

  public register() {
    const { username, password } = this.loginForm.value;
    this._authService.register(username, password, '', '').subscribe();
  }
}
