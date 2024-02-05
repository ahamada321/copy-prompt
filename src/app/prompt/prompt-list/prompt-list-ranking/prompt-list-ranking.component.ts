import { Component, OnInit } from '@angular/core';
import { Prompt } from '../../shared/prompt.model';
import { PromptService } from '../../shared/prompt.service';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-prompt-list-ranking',
  templateUrl: './prompt-list-ranking.component.html',
  styleUrls: ['./prompt-list-ranking.component.scss'],
})
export class PromptListRankingComponent implements OnInit {
  prompts!: Prompt[];
  pageIndex: number = 1;
  pageSize: number = 5; // Displaying contents per page.

  constructor(
    private promptService: PromptService,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.getPromptRanking();
  }

  getPromptRanking() {
    this.promptService
      .getPromptRanking(this.pageIndex, this.pageSize)
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
