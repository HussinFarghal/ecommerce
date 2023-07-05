import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecommerace';

  constructor(private _translationService: TranslateService) {}

  ngOnInit(): void {
    this._translationService.setDefaultLang('en');
    this._translationService.use('en');
  }
}
