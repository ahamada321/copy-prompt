import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
})
export class CodeSnippetComponent {
  @Input() code!: string;

  copyCode() {
    // ここでクリップボードにコピーするロジックを実装
    navigator.clipboard.writeText(this.code);
  }
}
