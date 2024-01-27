import { Component, OnInit, Input } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { PromptService } from 'src/app/prompt/shared/prompt.service';

@Component({
  selector: 'app-bookmark-list-item',
  templateUrl: './bookmark-list-item.component.html',
  styleUrls: ['./bookmark-list-item.component.scss'],
})
export class BookmarkListItemComponent implements OnInit {
  @Input() prompt!: any;
  isFavourite!: boolean;

  constructor(
    public auth: MyOriginAuthService,
    private promptService: PromptService
  ) {}

  ngOnInit() {
    this.initFavourite();
  }

  private initFavourite() {
    const index = this.prompt.favouritesFrom.indexOf(this.auth.getUserId());
    this.isFavourite = index >= 0;
  }

  toggleFavourite() {
    this.promptService.toggleFavourite(this.prompt._id).subscribe(
      (index) => {
        if (index >= 0) {
          this.prompt.favouritesFrom.splice(index, 1); // Dlete user from array.
        } else {
          this.prompt.favouritesFrom.push(this.auth.getUserId());
        }
        this.isFavourite = !(index >= 0); // Be careful. Need to return opposite.
      },
      (error) => {}
    );
  }
}
