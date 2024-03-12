import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { UserService } from 'src/app/user/shared/user.service';
import { User } from 'src/app/user/shared/user.model';

@Component({
  selector: 'app-prompt-detail-others',
  templateUrl: './prompt-detail-others.component.html',
  styleUrls: ['./prompt-detail-others.component.scss'],
})
export class PromptDetailOthersComponent implements OnInit {
  @Input() user!: User;
  foundUser!: User;

  constructor(
    public auth: MyOriginAuthService,
    public router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserById(this.user._id);
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
