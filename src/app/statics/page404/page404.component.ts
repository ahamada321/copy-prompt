import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.updateTitle();
  }

  updateTitle() {
    this.titleService.setTitle('404 page not found | あつまれ！GPTプロンプト');
  }
}
