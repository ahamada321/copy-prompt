import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptFormComponent } from './prompt-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [PromptFormComponent],
  exports: [PromptFormComponent],
})
export class PromptFormModule {}
