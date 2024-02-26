import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { CommentService } from '../../shared/comment.service';
import { Comment } from '../../shared/comment.model';

@Component({
  selector: 'app-prompt-list-comment',
  templateUrl: './prompt-list-comment.component.html',
  styleUrls: ['./prompt-list-comment.component.scss'],
})
export class PromptListCommentComponent implements OnInit {
  comments!: Comment[];

  constructor(
    private commentService: CommentService,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.getRandomComments();
  }

  getRandomComments() {
    this.commentService.getRandomComments().subscribe(
      (result) => {
        this.comments = result;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
