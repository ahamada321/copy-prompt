import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit, OnDestroy {
  description: string =
    'チャットGPTの可能性を最大限に引き出すプロンプト(指令文)テンプレでChatGPTを有効活用しよう！';

  constructor(private meta: Meta, private navbarService: NavbarService) {}

  ngOnInit() {
    this.updateMeta();
    this.navbarService.setNavbar();
  }

  ngOnDestroy() {
    this.navbarService.resetNavbar();
  }

  updateMeta() {
    this.meta.updateTag({
      name: 'description',
      content: this.description,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: this.description,
    });
  }
}
