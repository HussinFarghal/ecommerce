import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {TranslationService} from '../../shared/translation-service/translation.service';

export class TranslationLoader implements TranslateLoader {
  constructor(private translationService: TranslationService) {
  }

  getTranslation(lang: string): Observable<any> {
    return this.translationService.getTranslation(lang);
  }
}
