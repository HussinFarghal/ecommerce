import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../../../configs/api.config';
import { map } from 'rxjs/operators';
import { MegaMenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public menuItems: MegaMenuItem[] = [];

  constructor(private _http: HttpClient, private _translateService: TranslateService) {}

  getHeaderMenuItems() {
    return this._http.get(API_CONFIG.productsCategories.url()).pipe(map((res: any) => this.mapMenuItems(res)));
  }

  mapMenuItems(menuItems: string[]) {
    return menuItems
      .map(item => ({
        label: item,
        icon: 'pi pi-fw'
        // items: [
        //   [
        //     {
        //       label: 'Video 1',
        //       items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }]
        //     },
        //     {
        //       label: 'Video 2',
        //       items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }]
        //     }
        //   ]
        // ]
      }))
      .slice(0, 7);
  }
}
