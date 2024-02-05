import { Component, OnInit } from '@angular/core';
import { Prompt } from '../../shared/prompt.model';
import { PromptService } from '../../shared/prompt.service';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-prompt-list-latest',
  templateUrl: './prompt-list-latest.component.html',
  styleUrls: ['./prompt-list-latest.component.scss'],
})
export class PromptListLatestComponent implements OnInit {
  prompts!: Prompt[];
  pageIndex: number = 1;
  pageSize: number = 5; // Displaying contents per page.

  constructor(
    private promptService: PromptService,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.getLatestPrompts();
  }

  getLatestPrompts() {
    this.promptService
      .getLatestPrompts(this.pageIndex, this.pageSize)
      .subscribe(
        (result) => {
          this.prompts = result[0].foundPrompts;
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
