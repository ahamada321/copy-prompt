import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PromptService } from '../shared/prompt.service';
import { Router } from '@angular/router';
import { Prompt } from '../shared/prompt.model';
import Swal from 'sweetalert2';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-prompt-new',
  templateUrl: './prompt-new.component.html',
  styleUrls: ['./prompt-new.component.scss'],
})
export class PromptNewComponent implements OnInit, OnDestroy {
  newPrompt = new Prompt();
  isClicked: boolean = false;
  isImage: boolean = false;
  focus!: boolean;
  focus2!: boolean;
  errors: any[] = [];

  dropdownCategoryList = [
    // { id: 1, itemName: '時短' },
    { id: 2, itemName: '語学' },
    { id: 3, itemName: '占い' },
    // { id: 4, itemName: '金融' },
    // { id: 5, itemName: '要約' },
    { id: 6, itemName: 'コーチング・メンタリング' },
    { id: 7, itemName: 'プログラミング' },
    { id: 8, itemName: 'メール・文章作成・要約' },
    { id: 9, itemName: '資料作成' },
    { id: 10, itemName: 'アイデア・企画' },
    { id: 11, itemName: 'マーケティング・SEO対策・戦略' },
    // { id: 12, itemName: '資料作成' },
    { id: 13, itemName: 'ロールプレイ' },
    // { id: 14, itemName: '法律・規約関連' },
    // { id: 15, itemName: '生活・エンタメ' },
    { id: 16, itemName: 'その他' },
  ];

  selectedUsage!: { id: number; itemName: string };
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
    private navbarService: NavbarService,
    private promptService: PromptService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
  }

  onCategorySelect(item: any) {
    // Have to limit upto 1 items.
    if (this.newPrompt.categories.length > 1) {
      this.newPrompt.categories.pop();
    }
  }

  createUnpublishedPrompt() {
    this.isClicked = true;
    this.newPrompt.isShared = false;

    this.promptService.createPrompt(this.newPrompt).subscribe(
      (prompt: Prompt) => {
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
        this.isClicked = false;
      }
    );
  }

  createPrompt() {
    this.isClicked = true;
    this.newPrompt.isShared = true;

    this.promptService.createPrompt(this.newPrompt).subscribe(
      (prompt: Prompt) => {
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
      text: '新規登録しました！',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    }).then(() => {
      this.router.navigate(['/user'], { fragment: 'new' });
    });
  }
}
