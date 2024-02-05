import { Component, OnInit } from '@angular/core';
import { PromptService } from 'src/app/prompt/shared/prompt.service';
import { Prompt } from 'src/app/prompt/shared/prompt.model';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-user-mypage-myprompt',
  templateUrl: './user-mypage-myprompt.component.html',
  styleUrls: ['./user-mypage-myprompt.component.scss'],
})
export class UserMypageMypromptComponent implements OnInit {
  prompts!: Prompt[];
  promptDeleteIndex!: number;

  pageIndex: number = 1;
  pageSize: number = 40; // Displaying contents per page.
  pageCollectionSize: number = 1;

  constructor(
    private promptService: PromptService,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.getMyPrompts();
  }

  getMyPrompts() {
    this.promptService.getMyPrompts(this.pageIndex, this.pageSize).subscribe(
      (result) => {
        if (result[0].foundPrompts.length > 0) {
          this.prompts = result[0].foundPrompts;
          this.pageCollectionSize = result[0].metadata[0].total;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  // pageChange() {
  //   this.prompts = [];
  //   this.getMyPrompts();
  // }
}
