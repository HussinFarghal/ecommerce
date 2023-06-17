import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuModule } from 'primeng/megamenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { MenuModule } from 'primeng/menu';

const primengModules = [
  MegaMenuModule,
  InputTextModule,
  ButtonModule,
  AvatarModule,
  StyleClassModule,
  MenuModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, primengModules],
  exports: [primengModules],
})
export class PrimengModule {}
