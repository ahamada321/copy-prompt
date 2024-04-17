import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Prompt } from 'src/app/prompt/shared/prompt.model';
import { PromptService } from 'src/app/prompt/shared/prompt.service';

@Component({
  selector: 'app-quizbar',
  templateUrl: './quizbar.component.html',
  styleUrls: ['./quizbar.component.scss'],
})
export class QuizbarComponent implements OnInit, OnDestroy {
  prompt!: Prompt;
  isLoading: boolean = false;

  constructor(
    private modalService: NgbModal,
    private promptService: PromptService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.modalService.dismissAll();
  }

  popup(content: any, promptId?: string) {
    if (promptId) {
      this.getPrompt(promptId);
    }
    this.modalService.open(content, { backdrop: 'static' });
  }

  getPrompt(promptId: string) {
    this.isLoading = true;
    this.promptService.getPromptById(promptId).subscribe((prompt: Prompt) => {
      this.prompt = prompt;
      this.isLoading = false;
    });
  }
}
