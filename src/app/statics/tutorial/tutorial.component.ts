import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit, OnDestroy {
  activeTab = 1;
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
        'チャットGPTを最大限に楽しむ、プロンプトのテンプレが手に入るあつまれ！GPTプロンプト',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'チャットGPTを最大限に楽しむ、プロンプトのテンプレが手に入るあつまれ！GPTプロンプト',
    });
  }
}
