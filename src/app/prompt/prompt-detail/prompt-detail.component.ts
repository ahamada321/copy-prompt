import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoginPopupComponent } from 'src/app/auth/login-popup/login-popup.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Prompt } from '../shared/prompt.model';
// import { Review } from "src/app/common/review/service/review.model";
import { PromptService } from '../shared/prompt.service';
import { UserService } from 'src/app/user/shared/user.service';
// import { ReviewService } from "src/app/common/review/service/review.service";

@Component({
  selector: 'app-prompt-detail',
  templateUrl: './prompt-detail.component.html',
  styleUrls: ['./prompt-detail.component.scss'],
})
export class PromptDetailComponent implements OnInit, OnDestroy {
  isClicked: boolean = false;
  prompt!: Prompt;
  isBookmarked: boolean = false;
  rating!: number;
  // reviews: Review[] = [];
  safeUrl!: SafeResourceUrl;

  page = 1;

  constructor(
    public auth: MyOriginAuthService,
    private route: ActivatedRoute,
    public router: Router,
    public sanitizer: DomSanitizer,
    private promptService: PromptService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.route.params.subscribe((params) => {
      this.getPrompt(params['promptId']);
    });
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');

    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }
  }

  getPrompt(promptId: string) {
    this.promptService.getPromptById(promptId).subscribe((prompt: Prompt) => {
      this.prompt = prompt;
      const userId = this.auth.getUserId();
      const index = prompt.isBookmarkedFrom.findIndex((x) => x === userId);
      if (index !== -1) {
        this.isBookmarked = true;
      }
      // this.getAvgRating(prompt._id)
      // this.getReviews(prompt._id);
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

  getSafeUrl(url: string) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // getAvgRating(promptId: string) {
  //   this.reviewService.getAvgRating(promptId).subscribe((rating: number) => {
  //     this.rating = rating;
  //   });
  // }

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
