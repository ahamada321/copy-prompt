import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PromptService } from '../shared/prompt.service';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { Prompt } from '../shared/prompt.model';
import Swal from 'sweetalert2';

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
  promptCategories = Prompt.CATEGORIES;
  errors: any[] = [];

  dropdownList = [
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
  selectedItems: object[] = [];
  dropdownSettings = {
    singleSelection: false,
    text: '複数選択できます',
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
    private promptService: PromptService,
    private router: Router,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
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

  onItemSelect(item: any) {
    // Have to limit upto 3 items.
    if (this.selectedItems.length > 3) {
      this.selectedItems.pop();
    }
  }

  // onItemDeSelect(item: any) {
  //   if (this.selectedItems.length > 2) {
  //     debugger;
  //   }
  //   console.log(item);
  // }

  createUnpublishedPrompt() {
    this.isClicked = true;
    this.newPrompt.isShared = false;
    this.newPrompt.categories = this.selectedItems;

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
    this.newPrompt.categories = this.selectedItems;

    // if (!this.isImage) {
    //   this.errors.push({
    //     detail: 'プロフィール写真の選択と切り抜きを先に押してください',
    //   });
    //   this.isClicked = false;
    //   return;
    // }

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
      this.router.navigate(['/user']);
    });
  }

  imageChange(uploadedImage: any) {
    this.isImage = true;
    this.newPrompt.image = uploadedImage;
  }
}
