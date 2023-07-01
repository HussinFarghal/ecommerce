import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { API_CONFIG } from '../../../configs/api.config';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private localTranslations: { [key: string]: any } = {}; // Store the local translations here

  constructor(private http: HttpClient) {}

  getTranslations(lang: string): Observable<any> {
    return this.http.get<string>(API_CONFIG.content.url(lang));
  }

  getLocalTranslation(lang: string): Observable<any> {
    if (this.localTranslations[lang]) {
      // If the local translations for the given language are already loaded, return them
      return of(this.localTranslations[lang]);
    } else {
      // Load the local translations for the given language
      return this.http.get<any>(`./configs/i18n/${lang}.json`).pipe(
        // Store the local translations in the localTranslations object
        tap(translations => {
          this.localTranslations[lang] = translations;
        })
      );
    }
  }
}
