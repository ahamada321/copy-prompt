import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { CommentService } from '../../shared/comment.service';
import { Comment } from '../../shared/comment.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-prompt-list-comment',
  templateUrl: './prompt-list-comment.component.html',
  styleUrls: ['./prompt-list-comment.component.scss'],
})
export class PromptListCommentComponent implements OnInit {
  comments!: Comment[];
  isDragging!: boolean;
  customOptions: OwlOptions = {
    items: 1,
    margin: 50,
    loop: true,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayHoverPause: true,
    dotsEach: true,
    navSpeed: 700,
    // navText: [
    //   '<i class="fa fa-chevron-left"></i>',
    //   '<i class="fa fa-chevron-right"></i>',
    // ],
    // nav: true,
  };

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
