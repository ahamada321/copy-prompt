import { Component, OnInit, Input } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { RentalService } from 'src/app/rental/service/rental.service';

@Component({
  selector: 'app-bookmark-list-item',
  templateUrl: './bookmark-list-item.component.html',
  styleUrls: ['./bookmark-list-item.component.scss'],
})
export class BookmarkListItemComponent implements OnInit {
  @Input() rental!: any;
  isFavourite!: boolean;

  constructor(
    public auth: MyOriginAuthService,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    this.initFavourite();
  }

  private initFavourite() {
    const index = this.rental.favouritesFrom.indexOf(this.auth.getUserId());
    this.isFavourite = index >= 0;
  }

  toggleFavourite() {
    this.rentalService.toggleFavourite(this.rental._id).subscribe(
      (index) => {
        if (index >= 0) {
          this.rental.favouritesFrom.splice(index, 1); // Dlete user from array.
        } else {
          this.rental.favouritesFrom.push(this.auth.getUserId());
        }
        this.isFavourite = !(index >= 0); // Be careful. Need to return opposite.
      },
      (error) => {}
    );
  }
}
