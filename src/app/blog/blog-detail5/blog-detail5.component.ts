import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-blog-detail5',
  templateUrl: './blog-detail5.component.html',
  styleUrls: ['./blog-detail5.component.scss'],
})
export class BlogDetail5Component implements OnInit {
  constructor(public auth: MyOriginAuthService) {}

  ngOnInit() {}

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