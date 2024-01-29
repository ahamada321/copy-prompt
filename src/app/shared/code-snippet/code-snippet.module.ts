import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CodeSnippetComponent } from "./code-snippet.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CodeSnippetComponent],
  exports: [CodeSnippetComponent],
})
export class CodeSnippetModule {}
