import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {API_CONFIG} from '../../../configs/api.config';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private cache: { [key: string]: any } = {};
  private translations: any = {};
  private timeStamp: number;

  // `${API_CONFIG.content.url}${lang}.json?timestamp=${this.generateTimeStamp()}`
  constructor(private http: HttpClient) {
  }

  getTranslation(language: string): Observable<any> {
    if (this.translations[language]) {
      return of(this.translations[language]);
    } else {
      return this.fetchTranslationFromAPI(language).pipe(
        catchError(() => this.fetchTranslationFromLocal(language))
      );
    }
  }

  private fetchTranslationFromAPI(language: string): Observable<any> {
    const url = `${API_CONFIG.content.url}${language}.json?timestamp=${this.generateTimeStamp()}`;
    return this.http.get<any>(url).pipe(
      catchError(() => of(null)),
      tap((response) => {
        if (response) {
          this.translations[language] = response;
        }
      })
    );
  }

  private fetchTranslationFromLocal(language: string): Observable<any> {
    const url = `./configs/i18n/${language}.json`;
    return this.http.get<any>(url).pipe(
      tap((response) => {
        this.translations[language] = response;
      }),
      catchError(() => of({})) // Return an empty object if the local file is not found

    );
  }

  private generateTimeStamp(): number {
    return new Date().getTime();
  }
}
