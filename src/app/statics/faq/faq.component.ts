import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit, OnDestroy {
  constructor(private meta: Meta, private navbarService: NavbarService) {}

  ngOnInit() {
    this.updateMeta();
    this.navbarService.setNavbar();
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('blog-post');
  }
  ngOnDestroy() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('blog-post');
    this.navbarService.resetNavbar();
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
}
