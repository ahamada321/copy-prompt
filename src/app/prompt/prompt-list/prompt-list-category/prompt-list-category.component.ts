import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prompt-list-category',
  templateUrl: './prompt-list-category.component.html',
  styleUrls: ['./prompt-list-category.component.scss'],
})
export class PromptListCategoryComponent implements OnInit {
  @Output() event = new EventEmitter();

  constructor(private router: Router) {}
  ngOnInit() {}

  emit(keywords: string) {
    this.router.navigate(['/prompt'], {
      queryParams: { keywords, page: 1 },
    });
    this.event.emit(keywords);
  }
}
