import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentService } from '../../shared/comment.service';
import { UserService } from 'src/app/user/shared/user.service';
import { Prompt } from '../../shared/prompt.model';
import { Comment } from '../../shared/comment.model';
import { User } from 'src/app/user/shared/user.model';

@Component({
  selector: 'app-prompt-detail-comment',
  templateUrl: './prompt-detail-comment.component.html',
  styleUrls: ['./prompt-detail-comment.component.scss'],
})
export class PromptDetailCommentComponent implements OnInit {
  @Input() comments!: Comment[];
  isClicked: boolean = false;
  promptId!: Prompt;
  userId!: User;
  commentString: string = '';
  foundUser!: User;

  page = 1;

  constructor(
    public auth: MyOriginAuthService,
    private route: ActivatedRoute,
    public router: Router,
    public sanitizer: DomSanitizer,
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userId = this.auth.getUserId();
    if (this.userId) {
      this.getUserById(this.userId);
    }
    this.route.params.subscribe((params) => {
      this.promptId = params['promptId'];
    });
  }

  private getUserById(userId: User) {
    this.userService.getUserById(userId).subscribe(
      (foundUser) => {
        this.foundUser = foundUser;
      },
      (errorResponse) => {
        console.error(errorResponse);
      }
    );
  }

  postComment(postForm: NgForm) {
    this.isClicked = true;
    if (!this.userId) {
      this.userId = this.auth.getUserId();
      this.getUserById(this.userId);
    }

    this.commentService
      .postComment({
        comment: postForm.value.commentString,
        promptId: this.promptId,
        user: this.userId,
      })
      .subscribe(
        (newComment) => {
          newComment.user = this.foundUser;
          this.comments.unshift(newComment);
          this.isClicked = false;
          postForm.resetForm();
        },
        (err) => {
          this.isClicked = false;
        }
      );
  }
}
