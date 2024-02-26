import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
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

  images = [62, 83, 466, 965, 982, 1043, 738].map(
    (n) => `https://picsum.photos/id/${n}/900/500`
  );

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;

  @ViewChild('carousel') carousel!: NgbCarousel;

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
