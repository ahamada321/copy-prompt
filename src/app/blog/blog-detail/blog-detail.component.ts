import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Prompt } from 'src/app/prompt/shared/prompt.model';
import { PromptService } from 'src/app/prompt/shared/prompt.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  prompt!: Prompt;

  constructor(
    public auth: MyOriginAuthService,
    private promptService: PromptService
  ) {}

  ngOnInit() {
    this.getPrompt('65b45e422f06012bff45bfba'); // Prod
    // this.getPrompt('65b458188516101cf32a45a7'); // Dev
  }

  getPrompt(promptId: string) {
    this.promptService.getPromptById(promptId).subscribe((prompt: Prompt) => {
      this.prompt = prompt;
    });
  }

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
