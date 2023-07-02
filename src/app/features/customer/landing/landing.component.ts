import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../core/translation/translation-service/translation.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor(private translateService: TranslateService, private _translateService: TranslationService) {}

  ngOnInit(): void {
    console.log(this.translateService.translations);
  }
  switchToEnglish(): void {
    this.translateService.use('en');
  }

  switchToArabic(): void {
    this.translateService.use('ar');
  }
}
