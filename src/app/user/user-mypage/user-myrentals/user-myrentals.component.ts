import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/rental/service/rental.service';
import { Rental } from 'src/app/rental/service/rental.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-myrentals',
  templateUrl: './user-myrentals.component.html',
  styleUrls: ['./user-myrentals.component.scss'],
})
export class UserMyrentalsComponent implements OnInit {
  rentals: Rental[] = [];
  rentalDeleteIndex!: number;

  pageIndex: number = 1;
  pageSize: number = 40; // Displaying contents per page.
  pageCollectionSize: number = 1;

  constructor(
    private rentalService: RentalService,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.getOwnerRentals();
  }

  onDelete(rentalId: any) {
    Swal.fire({
      icon: 'warning',
      title: 'この操作は取り消せません',
      text: 'このプロンプトを削除します',
      confirmButtonColor: '#f5593d',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: '削除',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
    }).then((result) => {
      if (!result.dismiss) {
        this.deleteRental(rentalId);
      }
    });
  }

  deleteRental(rentalId: string) {
    this.rentalService.deleteRental(rentalId).subscribe(
      (status) => {
        const index = this.rentals.findIndex((x) => x._id === rentalId);
        this.rentals.splice(index, 1);
        Swal.fire({
          title: '削除しました',
          customClass: {
            confirmButton: 'btn btn-danger btn-lg',
          },
          buttonsStyling: false,
        });
      },
      (err) => {
        console.error(err);
        // Expecting to show error if try to dalete rental which has active bookings
        // this.toastr.error(errorResponse.error.errors[0].detail, 'Failed!')
      }
    );
  }

  getOwnerRentals() {
    this.rentalService.getOwnerRentals(this.pageIndex, this.pageSize).subscribe(
      (result) => {
        if (result[0].foundRentals.length > 0) {
          this.rentals = result[0].foundRentals;
          this.pageCollectionSize = result[0].metadata[0].total;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  pageChange() {
    this.rentals = [];
    this.getOwnerRentals();
  }
}
