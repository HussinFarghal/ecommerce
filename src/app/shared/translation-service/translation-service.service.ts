import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {API_CONFIG} from '../../../configs/api.config';

@Injectable({
  providedIn: 'root'
})
export class TranslationServiceService {
  private cache: { [key: string]: any } = {};

  constructor(private http: HttpClient) {
  }

  getTranslation(lang: string): Observable<any> {
    if (this.cache[lang]) {
      return of(this.cache[lang]);
    } else {
      return this.http.get(API_CONFIG.login.url()).pipe(
        map((res: any) => {
          this.cache[lang] = res;
          return res;
        }),
        catchError(() => of(null))
      );
    }
  }
}
