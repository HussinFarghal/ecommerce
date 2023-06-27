import { Injectable } from '@angular/core';
import { UserService } from '../core/services/user/user.service';
import { StorageService } from '../core/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonCacheService {
  constructor(private _userService: UserService, private _storageServices: StorageService) {}
}
