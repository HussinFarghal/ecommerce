import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_CONFIG} from '../../../configs/api.config';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private http: HttpClient) {
  }

  getTranslations(lang: string): Observable<any> {
    return this.http.get<string>(API_CONFIG.content.url(lang));

  }
}
