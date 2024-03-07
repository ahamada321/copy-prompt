import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { UserService } from 'src/app/user/shared/user.service';
import { User } from 'src/app/user/shared/user.model';
import { ObjectId } from 'mongoose';

@Component({
  selector: 'app-prompt-detail-others',
  templateUrl: './prompt-detail-others.component.html',
  styleUrls: ['./prompt-detail-others.component.scss'],
})
export class PromptDetailOthersComponent implements OnInit {
  @Input() userId?: ObjectId;
  foundUser?: User;
  page = 1;

  constructor(
    public auth: MyOriginAuthService,
    public router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserById(this.userId);
  }

  private getUserById(userId: any) {
    this.userService.getUserById(userId).subscribe(
      (foundUser) => {
        this.foundUser = foundUser;
      },
      (errorResponse) => {
        console.error(errorResponse);
      }
    );
  }
}
