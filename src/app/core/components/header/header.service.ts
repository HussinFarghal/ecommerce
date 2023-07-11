import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../../../configs/api.config';
import { map } from 'rxjs/operators';
import { MegaMenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public menuItems: MegaMenuItem[] = [];

  constructor(private _http: HttpClient) {}

  getHeaderMenuItems() {
    return this._http.get(API_CONFIG.productsCategories.url()).pipe(map((res: any) => this.mapMenuItems(res)));
  }

  mapMenuItems(menuItems: string[]) {
    return menuItems.map(item => ({
      label: item,
      icon: 'pi pi-fw pi-video',
      items: [
        [
          {
            label: 'Video 1',
            items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }]
          },
          {
            label: 'Video 2',
            items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }]
          }
        ]
      ]
    }));
  }
}
