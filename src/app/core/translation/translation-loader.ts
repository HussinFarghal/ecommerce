import { TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from '../../shared/translation-service/translation.service'; // Replace with the correct path
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class TranslationLoader implements TranslateLoader {
  constructor(private translationService: TranslationService, private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    const localTranslation$ = this.translationService.getLocalTranslation(lang);
    const externalTranslation$ = this.translationService.getTranslations(lang);
    return forkJoin([localTranslation$, externalTranslation$]).pipe(
      map(([localTranslations, externalTranslations]) => {
        // Merge the local and external translations
        const mergedTranslations = { ...localTranslations, ...externalTranslations };
        console.log('mergedTranslations=', mergedTranslations);
        return mergedTranslations;
      })
    );
  }
}
