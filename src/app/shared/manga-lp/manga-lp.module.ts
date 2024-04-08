import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangaLpComponent } from './manga-lp.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MangaLpComponent],
  imports: [CommonModule, RouterModule],
  exports: [MangaLpComponent],
  providers: [],
})
export class MangaLpModule {}
