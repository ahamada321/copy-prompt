import { Component, OnInit, OnDestroy } from '@angular/core';
import { Prompt } from '../shared/prompt.model';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-prompt-list',
  templateUrl: './prompt-list.component.html',
  styleUrls: ['./prompt-list.component.scss'],
})
export class PromptListComponent implements OnInit, OnDestroy {
  description: string =
    'プロンプトのテンプレを使うことで、今まで使いこなせなかったChatGPTが超有能に生まれ変わる！';
  prompts: Prompt[] = [];
  pageIndex: number = 1;
  pageSize: number = 40; // Displaying contents per page.
  pageCollectionSize: number = 1;

  constructor(
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    private navbarService: NavbarService,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.updateTitleAndMeta();
    this.navbarService.setNavbar();
  }

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
  }

  updateTitleAndMeta() {
    this.titleService.setTitle(
      'チャットGPTで時短！簡単に試せる便利なテンプレート集 | あつまれ！GPTプロンプト'
    );

    this.meta.updateTag({
      name: 'description',
      content: this.description,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: this.description,
    });
  }

  filterByName(keywords: string) {
    this.router.navigate(['/prompt'], {
      queryParams: { keywords: keywords ? keywords : '', page: 1 },
    });
  }
}
