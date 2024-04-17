import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizbarComponent } from './quizbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [QuizbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [QuizbarComponent],
  providers: [],
})
export class QuizbarModule {}
