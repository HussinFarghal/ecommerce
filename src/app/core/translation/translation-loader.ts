import { TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from '../../shared/translation-service/translation.service'; // Replace with the correct path
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class TranslationLoader implements TranslateLoader {
  constructor(private translationService: TranslationService, private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.translationService.getTranslations(lang);
  }
}
