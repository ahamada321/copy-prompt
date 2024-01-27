import { Component, OnInit, Input } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { PromptService } from '../../shared/prompt.service';
import { Prompt } from '../../shared/prompt.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/auth/login-popup/login-popup.component';

@Component({
  selector: 'app-prompt-list-item',
  templateUrl: './prompt-list-item.component.html',
  styleUrls: ['./prompt-list-item.component.scss'],
})
export class PromptListItemComponent implements OnInit {
  @Input() prompt!: Prompt;
  isFavorite!: boolean;

  constructor(
    public auth: MyOriginAuthService,
    private modalService: NgbModal,
    private promptService: PromptService
  ) {}

  ngOnInit() {
    // this.initFavourite();
  }

  // private initFavourite() {
  //   const index = this.prompt.favoritesFrom.indexOf(this.auth.getUserId());
  //   this.isFavorite = index >= 0;
  // }

  // toggleFavourite() {
  //   this.promptService.toggleFavourite(this.prompt._id).subscribe(
  //     (index) => {
  //       if (index >= 0) {
  //         this.prompt.favoritesFrom.splice(index, 1); // Dlete user from array.
  //       } else {
  //         this.prompt.favoritesFrom.push(this.auth.getUserId());
  //       }
  //       this.isFavorite = !(index >= 0); // Be careful. Need to return opposite.
  //     },
  //     (error) => {}
  //   );
  // }

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent, { backdrop: 'static' });
  }
}
