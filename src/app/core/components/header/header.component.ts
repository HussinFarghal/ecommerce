import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { SharedModule } from '../../../shared/shared.module';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../features/authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [],
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menuItems: MegaMenuItem[] = [];
  public profileMenuModel: MenuItem[] = [];
  public isUserLoggedIn: boolean;
  public isUserAdmin: boolean;
  public fullName: string;
  public image: string;
  private isUserLoggedInSub: Subscription;
  private isUserAdminSub: Subscription;
  private fullNameSub: Subscription;
  private imageSub: Subscription;
  private userID: number;

  constructor(private _storageService: StorageService, private _userService: UserService, private _authService: AuthService) {}

  ngOnInit(): void {
    this.fullName = this._userService.fullName;
    this.fullNameSub = this._userService.fullName$.subscribe(value => {
      this.fullName = value;
    });
    this.image = this._userService.profileImage;
    this.imageSub = this._userService.profileImage$.subscribe(value => {
      this.image = value;
    });
    this.isUserLoggedIn = this._userService.isUserLoggedIn;
    this.isUserLoggedInSub = this._userService.isUserLoggedIn$.subscribe(value => {
      this.isUserLoggedIn = value || this.getIsUserLoggedInFromStorage() === 'true';
    });

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
    this.profileMenuModel = [
      {
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            routerLink: ['/settings']
          },
          {
            label: 'Admin Panel',
            icon: 'pi pi-key',
            routerLink: ['/admin']
          },
          {
            label: 'Profile',
            icon: 'pi pi-user',
            routerLink: ['/profile']
          }
        ]
      }
    ];
  }

  private getIsUserLoggedInFromStorage(): string {
    return this._storageService.getLocalStorage('isUserLoggedIn');
  }

  public logout() {
    this._authService.logout();
  }
}
