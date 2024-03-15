import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-manual',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit, OnDestroy {
  title: string = 'プロンプトのトリセツ';
  description: string =
    'ChatGPTってこうやって使うんだ！がわかるチャットGPTのプロンプト(指示文)テンプレートサイト';
  previousTitle!: string;

  constructor(
    private titleService: Title,
    private meta: Meta,
    private navbarService: NavbarService
  ) {}
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
    this.updateTitleAndMeta();
    this.navbarService.setNavbar();
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('presentation-page');
  }

  ngOnDestroy() {
    this.titleService.setTitle(this.previousTitle);
    this.navbarService.resetNavbar();
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('presentation-page');
  }

  updateTitleAndMeta() {
    this.previousTitle = this.titleService.getTitle();
    this.titleService.setTitle(this.title + ' | あつまれ！GPTプロンプト');

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
