import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Prompt } from 'src/app/prompt/shared/prompt.model';
import { PromptService } from 'src/app/prompt/shared/prompt.service';

@Component({
  selector: 'app-blog-detail4',
  templateUrl: './blog-detail4.component.html',
  styleUrls: ['./blog-detail4.component.scss'],
})
export class BlogDetail4Component implements OnInit {
  title: string = 'ChatGPTを使いこなせてないと感じたら';
  previousTitle!: string;
  prompt!: Prompt;

  constructor(
    private titleService: Title,
    private meta: Meta,
    public auth: MyOriginAuthService,
    private promptService: PromptService
  ) {}

  ngOnInit() {
    this.getPrompt('65c98b01b20c808f092a302f'); // Prod
    // this.getPrompt('65b458188516101cf32a45a7'); // Dev
  }

  getPrompt(promptId: string) {
    this.promptService.getPromptById(promptId).subscribe((prompt: Prompt) => {
      this.prompt = prompt;
    });
  }

  updateTitleAndMeta() {
    this.previousTitle = this.titleService.getTitle();
    this.titleService.setTitle(this.title + ' | あつまれ！GPTプロンプト');

    this.meta.updateTag({
      name: 'description',
      content:
        'ChatGPTを試したけど、結局よくわからなかった。でも、それでChatGPTを使わなくなるのはかなりもったいない！生成AIの本領を発揮する方法を知りたい人はこちら',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'ChatGPTを試したけど、結局よくわからなかった。でも、それでChatGPTを使わなくなるのはかなりもったいない！生成AIの本領を発揮する方法を知りたい人はこちら',
    });
  }
}
