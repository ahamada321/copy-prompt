import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/auth/login-popup/login-popup.component';

import { PromptService } from '../shared/prompt.service';
import { UserService } from 'src/app/user/shared/user.service';
import { Prompt } from '../shared/prompt.model';
import { Comment } from '../shared/comment.model';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

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

  tags!: HTMLMetaElement[];

  constructor(
    private meta: Meta,
    private route: ActivatedRoute,
    public router: Router,
    public auth: MyOriginAuthService,
    public sanitizer: DomSanitizer,
    private navbarService: NavbarService,
    private promptService: PromptService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getPrompt(params['promptId']);
    });
  }

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
  }

  getPrompt(promptId: string) {
    this.promptService.getPromptById(promptId).subscribe((prompt: Prompt) => {
      this.prompt = prompt;
      this.comments = prompt.comments as Comment[];
      this.updateMeta();

      const userId = this.auth.getUserId();
      const index = prompt.isBookmarkedFrom.findIndex((x) => x === userId);
      if (index !== -1) {
        this.isBookmarked = true;
      }
    });
  }

  updateMeta() {
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

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent);
  }
}
