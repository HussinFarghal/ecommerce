import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {API_CONFIG} from '../../../configs/api.config';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private cache: { [key: string]: any } = {};
  private timeStamp: number;
  constructor(private http: HttpClient) {
  }

  getTranslation(lang: string): Observable<any> {
    if (this.cache[lang]) {
      return of(this.cache[lang]);
    } else {
      return this.http.get(`${API_CONFIG.content.url}${lang}.json?timestamp=${this.generateTimeStamp()}`).pipe(
        map((res: any) => {
          this.cache[lang] = res;
          return res;
        }),
        catchError(() => of(null))
      );
    }
  }
  private generateTimeStamp(): number {
    return new Date().getTime();
  }
}
