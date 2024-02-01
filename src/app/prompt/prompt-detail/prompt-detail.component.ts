import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MyOriginAuthService } from "src/app/auth/shared/auth.service";
import { DomSanitizer } from "@angular/platform-browser";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginPopupComponent } from "src/app/auth/login-popup/login-popup.component";

import { PromptService } from "../shared/prompt.service";
import { CommentService } from "../shared/comment.service";
import { UserService } from "src/app/user/shared/user.service";
import { Prompt } from "../shared/prompt.model";
import { Comment } from "../shared/comment.model";

@Component({
  selector: "app-prompt-detail",
  templateUrl: "./prompt-detail.component.html",
  styleUrls: ["./prompt-detail.component.scss"],
})
export class PromptDetailComponent implements OnInit, OnDestroy {
  isClicked: boolean = false;
  prompt!: Prompt;
  isBookmarked: boolean = false;
  comments!: Comment[];
  commentString: string = "";

  page = 1;

  constructor(
    public auth: MyOriginAuthService,
    private route: ActivatedRoute,
    public router: Router,
    public sanitizer: DomSanitizer,
    private promptService: PromptService,
    private commentService: CommentService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    let navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");

    this.route.params.subscribe((params) => {
      this.getPrompt(params["promptId"]);
    });
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
    if (navbar.classList.contains("nav-up")) {
      navbar.classList.remove("nav-up");
    }
  }

  getPrompt(promptId: string) {
    this.promptService.getPromptById(promptId).subscribe((prompt: Prompt) => {
      this.prompt = prompt;
      this.comments = prompt.comments as Comment[];
      const userId = this.auth.getUserId();
      const index = prompt.isBookmarkedFrom.findIndex((x) => x === userId);
      if (index !== -1) {
        this.isBookmarked = true;
      }
    });
  }

  addBookmark() {
    this.isClicked = true;
    this.userService.addBookmark(this.prompt._id).subscribe(
      (success) => {
        this.isBookmarked = true;
        this.isClicked = false;
      },
      (err) => {
        this.isClicked = false;
        console.error(err);
      }
    );
  }

  deleteBookmark() {
    this.isClicked = true;
    this.userService.deleteBookmark(this.prompt._id).subscribe(
      (success) => {
        this.isBookmarked = false;
        this.isClicked = false;
      },
      (err) => {
        this.isClicked = false;
        console.error(err);
      }
    );
  }

  postComment(commentString: string) {
    this.isClicked = true;
    this.commentService
      .postComment({ comment: commentString, promptId: this.prompt })
      .subscribe(
        (newComment) => {
          this.comments.unshift(newComment);
          this.isClicked = false;
        },
        (err) => {
          this.isClicked = false;
        }
      );
  }

  // getReviews(promptId: string) {
  //   this.reviewService.getPromptReviews(promptId).subscribe(
  //     (reviews: Review[]) => {
  //       this.reviews = reviews;
  //     },
  //     () => {}
  //   );
  // }

  isMine() {
    return this.prompt.user._id === this.auth.getUserId();
  }

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent);
  }
}
