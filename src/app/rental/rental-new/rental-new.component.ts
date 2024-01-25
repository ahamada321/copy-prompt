import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RentalService } from '../shared/rental.service';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { Rental } from '../shared/rental.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rental-new',
  templateUrl: './rental-new.component.html',
  styleUrls: ['./rental-new.component.scss'],
})
export class RentalNewComponent implements OnInit, OnDestroy {
  newRental = new Rental();
  isClicked: boolean = false;
  isImage: boolean = false;
  focus!: boolean;
  focus2!: boolean;
  rentalCategories = Rental.CATEGORIES;
  errors: any[] = [];

  dropdownList = [
    { id: 1, itemName: '文章作成' },
    { id: 2, itemName: '計算' },
    { id: 3, itemName: '偉人' },
    { id: 4, itemName: '時短' },
    { id: 5, itemName: '学校' },
    { id: 6, itemName: '壁打ち' },
    { id: 7, itemName: 'コミュニケーション' },
    { id: 8, itemName: '占い' },
    { id: 9, itemName: '金融' },
    { id: 10, itemName: '分析' },
    { id: 11, itemName: '英語' },
    { id: 12, itemName: '語学' },
    { id: 13, itemName: 'エンタメ' },
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
    private rentalService: RentalService,
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

  createUnpublishedRental() {
    this.isClicked = true;
    this.newRental.isShared = false;
    this.newRental.categories = this.selectedItems;

    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental) => {
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
        this.isClicked = false;
      }
    );
  }

  createRental() {
    this.isClicked = true;
    this.newRental.isShared = true;
    this.newRental.categories = this.selectedItems;

    // if (!this.isImage) {
    //   this.errors.push({
    //     detail: 'プロフィール写真の選択と切り抜きを先に押してください',
    //   });
    //   this.isClicked = false;
    //   return;
    // }

    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental) => {
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
    this.newRental.image = uploadedImage;
  }
}
