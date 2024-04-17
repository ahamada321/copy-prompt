import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizbarComponent } from './quizbar.component';
import { ListCardModule } from '../list-card/list-card.module';

@NgModule({
  declarations: [QuizbarComponent],
  imports: [CommonModule, ListCardModule],
  exports: [QuizbarComponent],
  providers: [],
})
export class QuizbarModule {}
