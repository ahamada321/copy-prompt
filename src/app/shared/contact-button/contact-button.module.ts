import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactButtonComponent } from './contact-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ContactButtonComponent],
  exports: [ContactButtonComponent],
})
export class ContactButtonModule {}
