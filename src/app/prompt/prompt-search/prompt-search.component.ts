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
  keywords!: string;
  condition!: string;
  pageIndex: number = 1;
  pageCollectionSize!: number;
  pageSize: number = 30; // Displaying contents per page.
  prompts: Prompt[] = [];
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

    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if (params['condition']) {
        this.condition = params['condition'];
      }
      if (params['keywords']) {
        this.keywords = params['keywords'];
      }
      if (params['page']) {
        this.pageIndex = params['page'];
      }
    });
    this.getPrompts();
  }

  ngOnDestroy() {
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

    this.prompts = [];
    this.getPrompts();
  }

  pageChange() {
    // Avoiding multiple pageChange() calling bug.
    if (this.isNgbInitialCall) {
      this.isNgbInitialCall = false;
      return;
    }

    this.prompts = [];
    this.getPrompts();
  }

  private getPrompts() {
    if (this.condition === 'ranking') {
      this.getPromptRanking();
    } else {
      this.getPromptsByKeywords();
    }
  }

  private getPromptsByKeywords() {
    this.keywords = this.keywords ? this.keywords : '';
    this.router.navigate(['/prompt'], {
      queryParams: { keywords: this.keywords, page: this.pageIndex },
    });

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
          }
        },
        (err) => {
          console.error(err);
        }
      );
  }

  private getPromptRanking() {
    this.router.navigate(['/prompt'], {
      queryParams: { condition: 'ranking', page: this.pageIndex },
    });

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
