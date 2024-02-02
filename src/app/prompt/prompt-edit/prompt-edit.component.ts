import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PromptService } from '../shared/prompt.service';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Prompt } from '../shared/prompt.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prompt-edit',
  templateUrl: './prompt-edit.component.html',
  styleUrls: ['./prompt-edit.component.scss'],
})
export class PromptEditComponent implements OnInit {
  foundPrompt!: Prompt;
  isTouched: boolean = false;
  isClicked: boolean = false;
  focus!: boolean;
  focus2!: boolean;
  errors: any[] = [];

  dropdownUsageLists = [
    'プロンプトをChatGPTにコピペして好みに書き換えてから送信',
    'プロンプトをChatGPTにコピペして送信 → 自由に質問',
    'プロンプトをChatGPTにコピペして送信 → 質問に答える',
  ];

  dropdownCategoryList = [
    { id: 1, itemName: '時短' },
    { id: 2, itemName: '語学' },
    { id: 3, itemName: '占い' },
    { id: 4, itemName: '金融' },
    { id: 5, itemName: 'コミュニケーション' },
    { id: 6, itemName: 'コーチング・コンサルタント' },
    { id: 7, itemName: 'プログラミング' },
    { id: 8, itemName: '文章作成・ブログ関連' },
    { id: 9, itemName: '要約' },
    { id: 10, itemName: 'アイデア・企画' },
    { id: 11, itemName: 'マーケティング・データ分析・統計' },
    { id: 12, itemName: '資料作成' },
    { id: 13, itemName: 'ロールプレイ' },
    { id: 14, itemName: '法律・規約関連' },
    { id: 15, itemName: '生活・エンタメ' },
    { id: 16, itemName: 'その他' },
  ];
  selectedCategory!: { id: number; itemName: string }[];
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
    private promptService: PromptService,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getPrompt(params['promptId']);
    });

    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('add-product');
  }
  ngOnDestroy() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('add-product');
  }

  onCategorySelect(item: any) {
    // Have to limit upto 1 items.
    if (this.selectedCategory.length > 1) {
      this.selectedCategory.pop();
    }
  }

  getPrompt(promptId: string) {
    this.promptService.getPromptById(promptId).subscribe(
      (foundPrompt: Prompt) => {
        this.foundPrompt = foundPrompt;
        this.selectedCategory = this.foundPrompt.categories;
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
    this.foundPrompt.categories = this.selectedCategory;

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
    this.foundPrompt.categories = this.selectedCategory;

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
