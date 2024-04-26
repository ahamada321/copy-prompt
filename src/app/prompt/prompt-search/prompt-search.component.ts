import { Component, OnDestroy, OnInit } from '@angular/core';
import { Prompt } from '../shared/prompt.model';
import { PromptService } from '../shared/prompt.service';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-prompt-search',
  templateUrl: './prompt-search.component.html',
  styleUrls: ['./prompt-search.component.scss'],
})
export class PromptSearchComponent implements OnInit, OnDestroy {
  isRanking: boolean = false;
  keywords: string = '';
  pageIndex!: number;
  pageCollectionSize!: number;
  pageSize: number = 30; // Displaying contents per page.
  prompts!: Prompt[] | undefined;
  isNgbInitialCall!: boolean; // Avoiding NgbPagination Initial calling bug.

  constructor(
    private promptService: PromptService,
    public auth: MyOriginAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.updateMeta();
    this.readQueryParams();
  }

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
  }

  private updateMeta() {
    this.meta.updateTag({
      name: 'description',
      content:
        'ChatGPTが優秀な助手になるかはあなた次第！あつまれ！GPTプロンプトでは有能になるChatGPTのプロンプトテンプレートが盛りだくさん',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'ChatGPTが優秀な助手になるかはあなた次第！あつまれ！GPTプロンプトでは有能になるChatGPTのプロンプトテンプレートが盛りだくさん',
    });
  }

  readQueryParams(keywords?: string) {
    if (keywords) {
      this.router.navigate(['/prompt'], {
        queryParams: { keywords, page: 1 },
      });
    }

    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.keywords = keywords
        ? keywords
        : params['keywords']
        ? params['keywords']
        : '';
      this.pageIndex = params['page'] ? params['page'] : 1;

      if (params['condition'] === 'ranking') {
        this.isRanking = true;
        this.getPromptRanking();
      } else {
        this.getPromptsByKeywords();
      }
    });
  }

  filterByName(keywords: string) {
    this.keywords = keywords;
    this.pageIndex = 1;
    this.router.navigate(['/prompt'], {
      queryParams: { keywords: this.keywords, page: this.pageIndex },
    });
    this.getPromptsByKeywords();
  }

  pageChange() {
    // Avoiding multiple pageChange() calling bug.
    if (this.isNgbInitialCall) {
      this.isNgbInitialCall = false;
      return;
    }

    if (this.isRanking) {
      this.router.navigate(['/prompt'], {
        queryParams: {
          condition: 'ranking',
          page: this.pageIndex,
        },
      });
      this.getPromptRanking();
    } else {
      this.router.navigate(['/prompt'], {
        queryParams: { keywords: this.keywords, page: this.pageIndex },
      });
      this.getPromptsByKeywords();
    }
  }

  private getPromptsByKeywords() {
    this.prompts = undefined;
    this.promptService
      .getPrompts(this.keywords, this.pageIndex, this.pageSize)
      .subscribe(
        (result) => {
          if (result[0].foundPrompts.length > 0) {
            if (!this.pageCollectionSize) {
              this.pageCollectionSize = result[0].metadata[0].total;
              this.isNgbInitialCall = true; // Avoiding NgbPagination recalling bug.
            }
            this.prompts = result[0].foundPrompts;
          } else {
            this.prompts = [];
          }
        },
        (errorResponse) => {
          console.error(errorResponse);
        }
      );
  }

  private getPromptRanking() {
    this.prompts = undefined;
    this.promptService
      .getPromptRanking(this.pageIndex, this.pageSize)
      .subscribe(
        (result) => {
          if (result[0].foundPrompts.length > 0) {
            if (!this.pageCollectionSize) {
              this.pageCollectionSize = result[0].metadata[0].total;
              this.isNgbInitialCall = true; // Avoiding NgbPagination recalling bug.
            }
            this.prompts = result[0].foundPrompts;
          }
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
