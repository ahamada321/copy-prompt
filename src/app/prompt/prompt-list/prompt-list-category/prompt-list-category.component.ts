import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-prompt-list-category',
  templateUrl: './prompt-list-category.component.html',
  styleUrls: ['./prompt-list-category.component.scss'],
})
export class PromptListCategoryComponent implements OnInit {
  @Output() event = new EventEmitter();

  constructor() {}
  ngOnInit() {}

  emit(keywords: string) {
    this.event.emit(keywords);
  }
}
