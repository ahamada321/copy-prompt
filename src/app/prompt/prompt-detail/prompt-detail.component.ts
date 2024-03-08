import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/auth/login-popup/login-popup.component';

import { PromptService } from '../shared/prompt.service';
import { UserService } from 'src/app/user/shared/user.service';
import { Prompt } from '../shared/prompt.model';
import { Comment } from '../shared/comment.model';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-prompt-detail',
  templateUrl: './prompt-detail.component.html',
  styleUrls: ['./prompt-detail.component.scss'],
})
export class PromptDetailComponent implements OnInit, OnDestroy {
  isClicked: boolean = false;
  prompt!: Prompt;
  isBookmarked: boolean = false;
  comments!: Comment[];
  previousTitle!: string;
  isFullTextShown: boolean = false;
  isLongTextString: boolean = false;

  constructor(
    private titleService: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    public router: Router,
    public auth: MyOriginAuthService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private navbarService: NavbarService,
    private promptService: PromptService,
    private userService: UserService,
    private modalService: NgbModal,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getPrompt(params['promptId']);
    });
  }

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
    this.titleService.setTitle(this.previousTitle);
  }

  getPrompt(promptId: string) {
    this.promptService.getPromptById(promptId).subscribe(
      (prompt: Prompt) => {
        this.prompt = prompt;
        this.comments = prompt.comments as Comment[];
        this.updateTitleAndMeta();

        const userId = this.auth.getUserId();
        const index = prompt.isBookmarkedFrom.findIndex((x) => x === userId);
        if (index !== -1) {
          this.isBookmarked = true;
        }
        this.cdr.detectChanges(); // DOMの更新を待機
        this.isLongTextString = this.isLongText();
      },
      (err) => {
        this.router.navigate(['/404']);
      }
    );
  }

  updateTitleAndMeta() {
    this.previousTitle = this.titleService.getTitle();
    this.titleService.setTitle(this.prompt.name + ' | あつまれ！GPTプロンプト');

    this.meta.updateTag({
      name: 'description',
      content: this.prompt.description,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: this.prompt.description,
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

  isMine() {
    return this.prompt.user._id === this.auth.getUserId();
  }

  isLongText() {
    const element = document.getElementById('text');
    if (!element) {
      return false;
    }
    const lineHeight = parseInt(
      window.getComputedStyle(element).lineHeight,
      10
    );
    const textHeight = element.clientHeight;
    const maxLines = Math.floor(textHeight / lineHeight);
    const maxLinesAllowed = 15; // Linked with .gradient-text (scss)
    return maxLines > maxLinesAllowed;
  }

  shareTwitter() {
    const URL =
      'https://twitter.com/intent/tweet?url=https://www.copy-prompt.com';
    const PATH = this.location.path();
    window.open(
      URL + PATH + '&text=' + '%0A' + this.prompt.name + 'プロンプト',
      '_blank'
    );
  }

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent);
  }
}
