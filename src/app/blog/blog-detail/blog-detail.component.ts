import { Component, OnInit, OnDestroy } from '@angular/core';
import { Prompt } from 'src/app/prompt/shared/prompt.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  prompt = new Prompt();

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}

  updateTitleAndMeta() {
    // this.previousTitle = this.titleService.getTitle();
    // this.titleService.setTitle(this.prompt.name + ' | あつまれ！GPTプロンプト');
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
