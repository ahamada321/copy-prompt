import { Component, OnInit, Input } from "@angular/core";
import { MyOriginAuthService } from "src/app/auth/shared/auth.service";
import { Prompt } from "../../shared/prompt.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginPopupComponent } from "src/app/auth/login-popup/login-popup.component";

@Component({
  selector: "app-prompt-list-item",
  templateUrl: "./prompt-list-item.component.html",
  styleUrls: ["./prompt-list-item.component.scss"],
})
export class PromptListItemComponent implements OnInit {
  @Input() prompt!: Prompt;

  constructor(
    public auth: MyOriginAuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent, { backdrop: "static" });
  }
}
