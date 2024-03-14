import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-blog-detail6',
  templateUrl: './blog-detail6.component.html',
  styleUrls: ['./blog-detail6.component.scss'],
})
export class BlogDetail6Component implements OnInit {
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
