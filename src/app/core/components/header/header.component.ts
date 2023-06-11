import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private _storageService: StorageService) {}

  ngOnInit(): void {
    this._storageService.onLocalStorageChange('token').subscribe((data) => {
      console.log('data From Header =', data);
    });
  }
}
