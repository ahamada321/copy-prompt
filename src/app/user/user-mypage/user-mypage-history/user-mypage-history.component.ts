import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Prompt } from 'src/app/prompt/shared/prompt.model';
import { UserService } from '../../shared/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-mypage-history',
  templateUrl: './user-mypage-history.component.html',
  styleUrls: ['./user-mypage-history.component.scss'],
})
export class UserMypageHistoryComponent implements OnInit {
  histories!: Prompt[];
  @ViewChild('Notice') noticeTemplateRef!: TemplateRef<any>;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getHistories();
  }

  private getHistories() {
    this.userService.getHistories().subscribe(
      (foundHistories: Prompt[]) => {
        this.histories = foundHistories;
        if (this.histories.length === 0) {
          this.guideOpen();
        }
      },
      (errorResponse) => {
        console.error(errorResponse);
      }
    );
  }

  guideOpen() {
    this.modalService.open(this.noticeTemplateRef, { backdrop: 'static' });
  }
}
