import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-blog-detail6',
  templateUrl: './blog-detail6.component.html',
  styleUrls: ['./blog-detail6.component.scss'],
})
export class BlogDetail6Component implements OnInit {
  title: string = '初めての使い方ガイド';
  previousTitle!: string;

  constructor(private titleService: Title, public auth: MyOriginAuthService) {}

  ngOnInit() {
    this.updateTitleAndMeta();
  }

  updateTitleAndMeta() {
    this.previousTitle = this.titleService.getTitle();
    this.titleService.setTitle(this.title + ' | あつまれ！GPTプロンプト');
    // this.meta.updateTag({
    //   name: 'description',
    //   content: this.prompt.description,
    // });
    // this.meta.updateTag({
    //   property: 'og:description',
    //   content: this.prompt.description,
    // });
  }
}
