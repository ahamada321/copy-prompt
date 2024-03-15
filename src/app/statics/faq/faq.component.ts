import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-manual',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit, OnDestroy {
  constructor(private meta: Meta, private navbarService: NavbarService) {}
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = document.getElementsByClassName('add-animation');
    const scrollPosition = window.pageYOffset;

    for (var i = 0; i < componentPosition.length; i++) {
      var rec =
        componentPosition[i].getBoundingClientRect().top + window.scrollY + 100;
      if (scrollPosition + window.innerHeight >= rec) {
        componentPosition[i].classList.add('animated');
      } else if (scrollPosition + window.innerHeight * 0.8 < rec) {
        componentPosition[i].classList.remove('animated');
      }
    }
  }

  ngOnInit() {
    this.updateMeta();
    this.navbarService.setNavbar();
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('presentation-page');
  }

  ngOnDestroy() {
    this.navbarService.resetNavbar();
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('presentation-page');
  }

  updateMeta() {
    this.meta.updateTag({
      name: 'description',
      content:
        'ChatGPTってこうやって使うんだ！がわかるチャットGPTのプロンプト(指示文)テンプレートサイト',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'ChatGPTってこうやって使うんだ！がわかるチャットGPTのプロンプト(指示文)テンプレートサイト',
    });
  }
}
