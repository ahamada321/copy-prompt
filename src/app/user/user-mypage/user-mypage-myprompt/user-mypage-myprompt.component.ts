import { Component, OnInit } from '@angular/core';
import { PromptService } from 'src/app/prompt/shared/prompt.service';
import { Prompt } from 'src/app/prompt/shared/prompt.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-mypage-myprompt',
  templateUrl: './user-mypage-myprompt.component.html',
  styleUrls: ['./user-mypage-myprompt.component.scss'],
})
export class UserMypageMypromptComponent implements OnInit {
  prompts: Prompt[] = [];
  promptDeleteIndex!: number;

  pageIndex: number = 1;
  pageSize: number = 40; // Displaying contents per page.
  pageCollectionSize: number = 1;

  constructor(
    private promptService: PromptService,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.getOwnerPrompts();
  }

  onDelete(promptId: any) {
    Swal.fire({
      icon: 'warning',
      title: 'この操作は取り消せません',
      text: 'このプロンプトを削除します',
      confirmButtonColor: '#f5593d',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: '削除',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
    }).then((result) => {
      if (!result.dismiss) {
        this.deletePrompt(promptId);
      }
    });
  }

  deletePrompt(promptId: string) {
    this.promptService.deletePrompt(promptId).subscribe(
      (status) => {
        const index = this.prompts.findIndex((x) => x._id === promptId);
        this.prompts.splice(index, 1);
        Swal.fire({
          title: '削除しました',
          customClass: {
            confirmButton: 'btn btn-danger btn-lg',
          },
          buttonsStyling: false,
        });
      },
      (err) => {
        console.error(err);
        // Expecting to show error if try to dalete prompt which has active bookings
        // this.toastr.error(errorResponse.error.errors[0].detail, 'Failed!')
      }
    );
  }

  getOwnerPrompts() {
    this.promptService.getOwnerPrompts(this.pageIndex, this.pageSize).subscribe(
      (result) => {
        if (result[0].foundPrompts.length > 0) {
          this.prompts = result[0].foundPrompts;
          this.pageCollectionSize = result[0].metadata[0].total;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  pageChange() {
    this.prompts = [];
    this.getOwnerPrompts();
  }
}
