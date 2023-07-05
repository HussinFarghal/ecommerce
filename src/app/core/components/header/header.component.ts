import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { SharedModule } from '../../../shared/shared.module';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../features/authentication/auth.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [],
  imports: [CommonModule, RouterModule, SharedModule],
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
  public currentLanguage: string;
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
  }

  public logout() {
    this._authService.logout();
  }

  changeLanguage(lang: string) {
    this._translationService.use(lang);
    this.currentLanguage = lang;
    this.changeDirection(lang === 'ar' ? 'rtl' : 'ltr');
  }

  changeDirection(dir: string) {
    document.getElementsByTagName('body')[0].setAttribute('dir', dir);
    // add class rtl when dir is rtl and ltr when dir is ltr
    document.getElementsByTagName('body')[0].classList.remove(dir === 'rtl' ? 'ltr' : 'rtl');
    document.getElementsByTagName('body')[0].classList.add(dir === 'rtl' ? 'rtl' : 'ltr');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
