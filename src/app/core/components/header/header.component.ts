import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService, UserService } from '@core/services/index';
import { SharedModule } from '@shared/shared.module';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { AuthService } from '@core/authentication/auth.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DIRECTIONS, LANGUAGES } from '@core/enums/index';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [],
  imports: [CommonModule, RouterModule, SharedModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public menuItems: MegaMenuItem[] = [];
  public profileMenuModel: MenuItem[] = [];
  public isUserLoggedIn: boolean;
  public isUserAdmin: boolean;
  public fullName: string;
  public image: string;
  public direction: DIRECTIONS;
  public currentLanguage: LANGUAGES | string;
  public checked: boolean;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _storageService: StorageService,
    private _userService: UserService,
    private _authService: AuthService,
    private _translationService: TranslateService
  ) {}

  ngOnInit(): void {
    this.fullName = this._userService.fullName;
    this.image = this._userService.profileImage;
    this.isUserLoggedIn = this._userService.isUserLoggedIn;
    this.isUserAdmin = this._userService.isAdmin ?? this._storageService.getLocalStorage('isAdmin') === 'true';
    combineLatest([
      this._userService.fullName$,
      this._userService.profileImage$,
      this._userService.isUserLoggedIn$,
      this._userService.isAdmin$
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([fullName, image, isUserLoggedIn, isAdmin]) => {
        this.fullName = fullName;
        this.image = image;
        this.isUserLoggedIn = isUserLoggedIn || this._storageService.getLocalStorage('isUserLoggedIn') === 'true';
        this.isUserAdmin = isAdmin || this._storageService.getLocalStorage('isAdmin') === 'true';
      });
    this._translationService.stream('header.profileMenu').subscribe(res => {
      this.profileMenuModel = res;
    });
    this.currentLanguage = this._translationService.currentLang;
    this.setDirection(this.currentLanguage);
    console.log('dir', this.direction);
    this.menuItems = [
      {
        label: 'Videos',
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
          ],
          [
            {
              label: 'Video 3',
              items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }]
            },
            {
              label: 'Video 4',
              items: [{ label: 'Video 4.1' }, { label: 'Video 4.2' }]
            }
          ]
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        items: [
          [
            {
              label: 'User 1',
              items: [{ label: 'User 1.1' }, { label: 'User 1.2' }]
            },
            {
              label: 'User 2',
              items: [{ label: 'User 2.1' }, { label: 'User 2.2' }]
            }
          ],
          [
            {
              label: 'User 3',
              items: [{ label: 'User 3.1' }, { label: 'User 3.2' }]
            },
            {
              label: 'User 4',
              items: [{ label: 'User 4.1' }, { label: 'User 4.2' }]
            }
          ],
          [
            {
              label: 'User 5',
              items: [{ label: 'User 5.1' }, { label: 'User 5.2' }]
            },
            {
              label: 'User 6',
              items: [{ label: 'User 6.1' }, { label: 'User 6.2' }]
            }
          ]
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          [
            {
              label: 'Event 1',
              items: [{ label: 'Event 1.1' }, { label: 'Event 1.2' }]
            },
            {
              label: 'Event 2',
              items: [{ label: 'Event 2.1' }, { label: 'Event 2.2' }]
            }
          ],
          [
            {
              label: 'Event 3',
              items: [{ label: 'Event 3.1' }, { label: 'Event 3.2' }]
            },
            {
              label: 'Event 4',
              items: [{ label: 'Event 4.1' }, { label: 'Event 4.2' }]
            }
          ]
        ]
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          [
            {
              label: 'Setting 1',
              items: [{ label: 'Setting 1.1' }, { label: 'Setting 1.2' }]
            },
            {
              label: 'Setting 2',
              items: [{ label: 'Setting 2.1' }, { label: 'Setting 2.2' }]
            },
            {
              label: 'Setting 3',
              items: [{ label: 'Setting 3.1' }, { label: 'Setting 3.2' }]
            }
          ],
          [
            {
              label: 'Technology 4',
              items: [{ label: 'Setting 4.1' }, { label: 'Setting 4.2' }]
            }
          ]
        ]
      }
    ];
    this._translationService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
      this.setDirection(event.lang === LANGUAGES.AR ? DIRECTIONS.RTL : DIRECTIONS.LTR);
      console.log('dir', this.direction);
    });
  }

  public logout() {
    this._authService.logout();
  }

  changeLanguage(lang: string) {
    this._translationService.use(lang);
    this.currentLanguage = lang;
    this.setDirection(lang === LANGUAGES.AR ? DIRECTIONS.RTL : DIRECTIONS.LTR);
  }

  setDirection(dir: string) {
    document.getElementsByTagName('body')[0].setAttribute('dir', dir);
    document.getElementsByTagName('body')[0].classList.remove(dir === DIRECTIONS.RTL ? DIRECTIONS.LTR : DIRECTIONS.RTL);
    document.getElementsByTagName('body')[0].classList.add(dir === DIRECTIONS.RTL ? DIRECTIONS.RTL : DIRECTIONS.LTR);
    this.direction = dir === DIRECTIONS.RTL ? DIRECTIONS.RTL : DIRECTIONS.LTR;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(event: Event) {
    document.getElementsByTagName('body')[0].classList.toggle('light');
    document.getElementsByTagName('body')[0].classList.toggle('dark');
  }
}
