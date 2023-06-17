import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private cookieService: CookieService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {}

  public setLocalStorage(key: string, value: string): void {
    this.localStorageService.store(key, value);
  }

  public getLocalStorage(key: string): string {
    return this.localStorageService.retrieve(key);
  }

  public deleteLocalStorage(key: string): void {
    this.localStorageService.clear(key);
  }

  clearAllLocalStorage(): void {
    this.localStorageService.clear();
  }

  // cookies
  public setCookie(
    key: string,
    value: string,
    expires?: number,
    path?: string
  ): void {
    this.cookieService.set(key, value, expires, path);
  }

  public getCookie(key: string): string {
    return this.cookieService.get(key);
  }

  public deleteCookie(key: string): void {
    this.cookieService.delete(key);
  }

  // session storage
  public setSessionStorage(key: string, value: string): void {
    this.sessionStorageService.store(key, value);
  }

  public getSessionStorage(key: string): string {
    return this.sessionStorageService.retrieve(key);
  }

  public deleteSessionStorage(key: string): void {
    this.sessionStorageService.clear(key);
  }

  public clearAllSessionStorage(): void {
    this.sessionStorageService.clear();
  }

  public onLocalStorageChange(key?: string): Observable<string> {
    return this.localStorageService.observe(key);
  }

  public onLocalSessionChange(key?: string): Observable<string> {
    return this.sessionStorageService.observe(key);
  }

  public clearAll(): void {
    this.clearAllLocalStorage();
    this.clearAllSessionStorage();
    this.cookieService.deleteAll();
  }
}
