import { TranslateDefaultParser } from '@ngx-translate/core';

export class CustomTranslateParser extends TranslateDefaultParser {
  render(key: string, interpolateParams?: object): object {
    // Return the translation as an object instead of a string
    return { key, interpolateParams };
  }
}
