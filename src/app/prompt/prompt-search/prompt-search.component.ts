import { Component, OnDestroy, OnInit } from '@angular/core';
import { Prompt } from '../shared/prompt.model';
import { PromptService } from '../shared/prompt.service';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-prompt-search',
  templateUrl: './prompt-search.component.html',
  styleUrls: ['./prompt-search.component.scss'],
})
export class PromptSearchComponent implements OnInit, OnDestroy {
  keywords!: string;
  condition!: string;
  prompts: Prompt[] = [];
  pageIndex: number = 1;
  pageSize: number = 30; // Displaying contents per page.
  pageCollectionSize: number = 1;

  constructor(
    private promptService: PromptService,
    public auth: MyOriginAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta
  ) {}

  ngOnInit() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.updateMeta();
    this.getPrompts();
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

  ngOnDestroy() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }
  }

  filterByName(keywords: string) {
    this.router.navigate(['/prompt/search', { keywords: keywords }]);
    this.getPrompts();
  }

  pageChange() {
    this.prompts = [];
    this.getPrompts();
  }

  getPrompts() {
    this.route.params.subscribe((params) => {
      this.condition = params['condition'];
      this.keywords = params['keywords'];

      if (this.condition === 'latest') {
        this.getLatestPrompts();
        return;
      } else if (this.condition === 'ranking') {
        this.getPromptRanking();
      } else {
        this.promptService
          .getPrompts(this.keywords, this.pageIndex, this.pageSize)
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
      }
    });
  }

  private getLatestPrompts() {
    this.promptService
      .getLatestPrompts(this.pageIndex, this.pageSize)
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
  }

  private getPromptRanking() {
    this.promptService
      .getPromptRanking(this.pageIndex, this.pageSize)
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
  }
}
