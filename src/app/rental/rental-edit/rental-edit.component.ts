import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Rental } from '../shared/rental.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rental-edit',
  templateUrl: './rental-edit.component.html',
  styleUrls: ['./rental-edit.component.scss'],
})
export class RentalEditComponent implements OnInit {
  foundRental!: Rental;
  isTouched: boolean = false;
  isClicked: boolean = false;
  focus!: boolean;
  focus2!: boolean;
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
    private router: Router,
    private route: ActivatedRoute,
    private rentalService: RentalService,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getRental(params['rentalId']);
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

  onItemSelect(item: any) {
    // Have to limit upto 3 items.
    if (this.selectedItems.length > 3) {
      this.selectedItems.pop();
    }
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe(
      (foundRental: Rental) => {
        this.foundRental = foundRental;
        this.selectedItems = this.foundRental.categories;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }

  unpublishRental() {
    this.isClicked = true;
    this.foundRental.isShared = false;
    this.foundRental.categories = this.selectedItems;

    this.rentalService
      .updateRental(this.foundRental._id, this.foundRental)
      .subscribe(
        (updatedRental) => {
          this.showSwalSuccess();
        },
        (errorResponse: HttpErrorResponse) => {
          console.error(errorResponse);
          this.errors = errorResponse.error.errors;
          this.isClicked = false;
        }
      );
  }

  updateRental() {
    this.isClicked = true;
    this.foundRental.isShared = true;
    this.foundRental.categories = this.selectedItems;

    this.rentalService
      .updateRental(this.foundRental._id, this.foundRental)
      .subscribe(
        (updatedRental) => {
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
