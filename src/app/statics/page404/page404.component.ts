import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component implements OnInit, OnDestroy {
  previousTitle!: string;

  constructor(private titleService: Title) {}

  ngOnInit() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.updateTitle();
  }
  ngOnDestroy() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    this.titleService.setTitle(this.previousTitle);
  }

  updateTitle() {
    this.previousTitle = this.titleService.getTitle();
    this.titleService.setTitle('404 page not found | あつまれ！GPTプロンプト');
  }
}
