import { Component, OnInit } from '@angular/core';
import { Prompt } from '../../shared/prompt.model';
import { PromptService } from '../../shared/prompt.service';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prompt-list-ranking',
  templateUrl: './prompt-list-ranking.component.html',
  styleUrls: ['./prompt-list-ranking.component.scss'],
})
export class PromptListRankingComponent implements OnInit {
  prompts: Prompt[] = [];
  pageIndex: number = 1;
  pageSize: number = 7; // Displaying contents per page.
  pageCollectionSize: number = 1;

  constructor(
    private promptService: PromptService,
    public auth: MyOriginAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPrompts();
  }

  getPrompts() {
    this.route.queryParams.subscribe((keywords) => {
      this.promptService
        .getPrompts(keywords, this.pageIndex, this.pageSize)
        .subscribe(
          (result) => {
            this.prompts = result[0].foundPrompts;
            if (this.prompts.length > 0) {
              this.pageCollectionSize = result[0].metadata[0].total;
            }
          },
          (err) => {
            console.error(err);
          }
        );
    });
  }

  filterByName(keywords: string) {
    this.router.navigate(['/prompt'], {
      queryParams: {
        keywords,
      },
      queryParamsHandling: 'merge', // Preserve current queryParams
    });
  }

  pageChange() {
    this.prompts = [];
    this.getPrompts();
  }
}
