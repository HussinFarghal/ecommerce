import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthenticationComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AuthenticationModule {}
