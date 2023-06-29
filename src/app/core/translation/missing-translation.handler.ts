// import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
// import { HttpClient } from '@angular/common/http';
// import { forkJoin, Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
//
// export class MyMissingTranslationHandler implements MissingTranslationHandler {
//   constructor(private http: HttpClient) {}
//
//   handle(params: MissingTranslationHandlerParams) {
//     const key = params.key;
//
//     // Search for the translation key in the external URL
//     return this.getTranslationFromExternalURL(key).pipe(
//       catchError(() =>
//         // If key not found in the external URL, search in local files
//          this.getTranslationFromLocalFiles(key)
//       )
//     );
//   }
//
//   private getTranslationFromExternalURL(key): Observable<any> {
//     const externalURL = 'https://example.com/translations/';
//     const externalRequest = this.http.get(`${externalURL}${key}.json`);
//
//     return externalRequest.pipe(
//       catchError(() =>
//          of(null) // Return null if key is not found in the external URL
//       )
//     );
//   }
//
//   private getTranslationFromLocalFiles(key): Observable<any> {
//     const localURLs = ['./configs/i18n/en.json', './assets/i18n/ar.json'];
//     const localRequests = localURLs.map(url => this.http.get(url));
//
//     return forkJoin(localRequests).pipe(
//       catchError(() =>
//          of(null) // Return null if key is not found in local files
//       ),
//       map(responses => {
//         for (const response of responses) {
//           if (response && response[key]) {
//             return response[key]; // Return the translation value if found in local files
//           }
//         }
//         return `#${key}#`; // Return fallback value if key is not found in local files
//       })
//     );
//   }
// }
