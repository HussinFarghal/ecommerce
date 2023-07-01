import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/features/authentication/auth.service';
import { StorageService } from './core/services/storage/storage.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { UserService } from './core/services/user/user.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en'
    }),
    AppRoutingModule,
    FooterComponent,
    HeaderComponent,
    NgxWebstorageModule.forRoot({
      prefix: '',
      separator: '',
      caseSensitive: false
    })
  ],
  providers: [AuthService, StorageService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
