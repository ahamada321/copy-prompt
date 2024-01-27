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
// import { ReviewService } from "src/app/common/review/service/review.service";

@Component({
  selector: 'app-prompt-detail',
  templateUrl: './prompt-detail.component.html',
  styleUrls: ['./prompt-detail.component.scss'],
})
export class PromptDetailComponent implements OnInit, OnDestroy {
  currentId!: string;
  prompt!: Prompt;
  rating!: number;
  // reviews: Review[] = [];
  safeUrl!: SafeResourceUrl;

  headerOffset: number = 75; // want to replace like DEFINE HEADER_OFFSET
  page = 1;

  constructor(
    private route: ActivatedRoute,
    private promptService: PromptService,
    // private reviewService: ReviewService,
    private modalService: NgbModal,
    public router: Router,
    public auth: MyOriginAuthService,
    public sanitizer: DomSanitizer
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

  // isYourPrompt() {
  //   return this.prompt.user._id === this.auth.getUserId();
  // }

  getPrompt(promptId: string) {
    this.promptService.getPromptById(promptId).subscribe((prompt: Prompt) => {
      this.prompt = prompt;
      // this.getAvgRating(prompt._id)
      // this.getReviews(prompt._id);
      // this.getSafeUrl(prompt.course1Img);
    });
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

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent);
  }
}
