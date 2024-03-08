import { Component, OnInit, OnDestroy } from '@angular/core';
import { Prompt } from '../shared/prompt.model';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-prompt-list',
  templateUrl: './prompt-list.component.html',
  styleUrls: ['./prompt-list.component.scss'],
})
export class PromptListComponent implements OnInit, OnDestroy {
  prompts: Prompt[] = [];
  pageIndex: number = 1;
  pageSize: number = 40; // Displaying contents per page.
  pageCollectionSize: number = 1;

  constructor(
    private meta: Meta,
    private router: Router,
    private navbarService: NavbarService,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.updateMeta();
    this.navbarService.setNavbar();
  }

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
  }

  updateMeta() {
    this.meta.updateTag({
      name: 'description',
      content:
        'プロンプトテンプレをコピペするだけで、今まで使いこなせなかったChatGPTが超有能に生まれ変わる！',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'プロンプトテンプレをコピペするだけで、今まで使いこなせなかったChatGPTが超有能に生まれ変わる！',
    });
  }

  filterByName(keywords: string) {
    this.router.navigate(['/prompt'], {
      queryParams: { keywords: keywords ? keywords : '', page: 1 },
    });
  }
}
