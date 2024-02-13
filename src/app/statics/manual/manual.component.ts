import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss'],
})
export class ManualComponent implements OnInit, OnDestroy {
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
      content:
        'こんなに楽できる！コピペだけでチャットGPTを最大限に活用できるテンプレが豊富なプロンプト共有サイト',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'こんなに楽できる！コピペだけでチャットGPTを最大限に活用できるテンプレが豊富なプロンプト共有サイト',
    });
  }
}
