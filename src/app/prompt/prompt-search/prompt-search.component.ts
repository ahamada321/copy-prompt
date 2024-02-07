import { Component, OnDestroy, OnInit } from '@angular/core';
import { Prompt } from '../shared/prompt.model';
import { PromptService } from '../shared/prompt.service';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prompt-search',
  templateUrl: './prompt-search.component.html',
  styleUrls: ['./prompt-search.component.scss'],
})
export class PromptSearchComponent implements OnInit, OnDestroy {
  keywords!: string;
  condition!: string;
  pageIndex!: number;
  pageCollectionSize!: number;
  pageSize: number = 30; // Displaying contents per page.
  prompts: Prompt[] = [];
  isNgbInitialCall: boolean = true;
  private routeSubscription!: Subscription;

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

    // Always watching changes after ngOnInit.
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      this.condition = params['condition'];
      this.keywords = params['keywords'];
      if (params['page']) {
        this.pageIndex = params['page'];
      }
    });

    this.getPrompts();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.navbarService.resetNavbarPosition();
  }

  updateMeta() {
    this.meta.updateTag({
      name: 'description',
      content:
        'ChatGPTやBingで使える超高品質なプロンプトのテンプレが無料で手に入るサービスです',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'ChatGPTやBingで使える超高品質なプロンプトのテンプレが無料で手に入るサービスです',
    });
  }

  filterByName(keywords: string) {
    this.keywords = keywords;
    this.condition = '';
    this.pageIndex = 1;
    this.router.navigate(['/prompt/search'], {
      queryParams: { keywords: keywords ? keywords : '', page: this.pageIndex },
    });
    this.prompts = [];
    this.getPrompts();
  }

  pageChange() {
    if (this.isNgbInitialCall) {
      this.isNgbInitialCall = false;
      return;
    }
    this.isNgbInitialCall = true; // Avoiding NgbPagination multiple calling bug.

    this.prompts = [];
    this.getPrompts();
  }

  private getPrompts() {
    if (this.keywords) {
      this.getPromptsByKeywords(this.keywords);
    } else if (this.condition === 'latest') {
      this.getLatestPrompts();
    } else if (this.condition === 'ranking') {
      this.getPromptRanking();
    }
  }

  private getPromptsByKeywords(keywords: string) {
    this.promptService
      .getPrompts(keywords, this.pageIndex, this.pageSize)
      .subscribe(
        (result) => {
          if (result[0].foundPrompts.length > 0) {
            this.pageCollectionSize = result[0].metadata[0].total;
            this.isNgbInitialCall = true; // Avoiding NgbPagination multiple calling bug.

            this.router.navigate(['/prompt/search'], {
              queryParams: { keywords: this.keywords, page: this.pageIndex },
            });
            this.prompts = result[0].foundPrompts;
          }
        },
        (err) => {
          console.error(err);
        }
      );
  }

  private getLatestPrompts() {
    this.promptService
      .getLatestPrompts(this.pageIndex, this.pageSize)
      .subscribe(
        (result) => {
          if (result[0].foundPrompts.length > 0) {
            if (!this.pageCollectionSize) {
              this.pageCollectionSize = result[0].metadata[0].total;
            }
            this.router.navigate(['/prompt/search'], {
              queryParams: { condition: 'latest', page: this.pageIndex },
            });
            this.prompts = result[0].foundPrompts;
          }
        },
        (err) => {
          console.error(err);
        }
      );
  }

  private getPromptRanking() {
    this.promptService
      .getPromptRanking(this.pageIndex, this.pageSize)
      .subscribe(
        (result) => {
          if (result[0].foundPrompts.length > 0) {
            if (!this.pageCollectionSize) {
              this.pageCollectionSize = result[0].metadata[0].total;
            }
            this.router.navigate(['/prompt/search'], {
              queryParams: { condition: 'ranking', page: this.pageIndex },
            });
            this.prompts = result[0].foundPrompts;
          }
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
