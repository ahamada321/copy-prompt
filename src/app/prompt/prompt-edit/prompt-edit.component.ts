import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PromptService } from '../shared/prompt.service';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Prompt } from '../shared/prompt.model';
import Swal from 'sweetalert2';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-prompt-edit',
  templateUrl: './prompt-edit.component.html',
  styleUrls: ['./prompt-edit.component.scss'],
})
export class PromptEditComponent implements OnInit, OnDestroy {
  foundPrompt!: Prompt;
  isTouched: boolean = false;
  isClicked: boolean = false;
  errors: any[] = [];

  dropdownUsageLists = [
    'プロンプトをChatGPTにコピペして好みに書き換えてから送信',
    'プロンプトをChatGPTにコピペして送信 → 自由に質問',
    'プロンプトをChatGPTにコピペして送信 → 質問に答える',
  ];

  dropdownCategoryList = [
    // { id: 1, itemName: '時短' },
    { id: 2, itemName: '語学' },
    { id: 3, itemName: '占い' },
    { id: 4, itemName: '金融' },
    { id: 5, itemName: '要約' },
    { id: 6, itemName: 'コーチング・コンサルタント' },
    { id: 7, itemName: 'プログラミング' },
    { id: 8, itemName: '文章作成・ブログ関連' },
    // { id: 9, itemName: '' },
    { id: 10, itemName: 'アイデア・企画' },
    { id: 11, itemName: 'マーケティング・データ分析・統計' },
    { id: 12, itemName: '資料作成' },
    { id: 13, itemName: 'ロールプレイ' },
    { id: 14, itemName: '法律・規約関連' },
    { id: 15, itemName: '生活・エンタメ' },
    { id: 16, itemName: 'その他' },
  ];
  dropdownSettings = {
    singleSelection: false,
    text: 'カテゴリを選択してください',
    selectAllText: 'すべて選択',
    unSelectAllText: 'すべて選択を解除',
    enableSearchFilter: true,
    searchPlaceholderText: 'キーワード検索',
    filterSelectAllText: '検索結果一覧',
    filterUnSelectAllText: '検索結果一覧',
    noDataLabel: '検索結果無し',
    // primaryKey: "id",
    // labelKey: "itemName",
    // classes: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private promptService: PromptService,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getPrompt(params['promptId']);
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('add-product');
  }

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('add-product');
  }

  onCategorySelect(item: any) {
    // Have to limit upto 1 items.
    if (this.foundPrompt.categories.length > 1) {
      this.foundPrompt.categories.pop();
    }
  }

  getPrompt(promptId: string) {
    this.promptService.getPromptById(promptId).subscribe(
      (foundPrompt: Prompt) => {
        this.foundPrompt = foundPrompt;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }

  unpublishPrompt() {
    this.isClicked = true;
    this.foundPrompt.isShared = false;

    this.promptService
      .updatePrompt(this.foundPrompt._id, this.foundPrompt)
      .subscribe(
        (updatedPrompt) => {
          this.showSwalSuccess();
        },
        (errorResponse: HttpErrorResponse) => {
          console.error(errorResponse);
          this.errors = errorResponse.error.errors;
          this.isClicked = false;
        }
      );
  }

  updatePrompt() {
    this.isClicked = true;
    this.foundPrompt.isShared = true;

    this.promptService
      .updatePrompt(this.foundPrompt._id, this.foundPrompt)
      .subscribe(
        (updatedPrompt) => {
          this.showSwalSuccess();
        },
        (errorResponse: HttpErrorResponse) => {
          console.error(errorResponse);
          this.errors = errorResponse.error.errors;
          this.isClicked = false;
        }
      );
  }

  private showSwalSuccess() {
    Swal.fire({
      // title: 'User infomation has been updated!',
      icon: 'success',
      text: 'プロンプトを更新しました',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    }).then(() => {
      this.router.navigate(['/user']);
    });
  }
}
