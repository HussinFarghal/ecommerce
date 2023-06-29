import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, PrimengModule, TranslateModule],
  exports: [PrimengModule, TranslateModule]
})
export class SharedModule {}
