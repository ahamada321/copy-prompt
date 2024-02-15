import { NgModule } from '@angular/core';
import { ContactButtonComponent } from './contact-button.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ContactButtonComponent],
  exports: [ContactButtonComponent],
})
export class ContactButtonModule {}
