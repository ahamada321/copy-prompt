import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Prompt } from 'src/app/prompt/shared/prompt.model';
import { UserService } from '../../shared/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-mypage-history',
  templateUrl: './user-mypage-history.component.html',
  styleUrls: ['./user-mypage-history.component.scss'],
})
export class UserMypageHistoryComponent implements OnInit {
  histories!: Prompt[];
  @ViewChild('Notice') noticeTemplateRef!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getHistories();
  }

  private getHistories() {
    this.userService.getHistories().subscribe(
      (foundHistories: Prompt[]) => {
        if (foundHistories.length === 0) {
          this.guideOpen();
          return;
        }
        this.route.queryParams.subscribe((params) => {
          if (params['fromDetail'] && foundHistories.length === 1) {
            this.guideOpen();
          }
        });
        this.histories = foundHistories.reverse();
      },
      (errorResponse) => {
        console.error(errorResponse);
      }
    );
  }

  private guideOpen() {
    this.modalService.open(this.noticeTemplateRef, { backdrop: 'static' });
  }
}
