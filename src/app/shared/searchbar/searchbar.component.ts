import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  @Input() searchWords!: string;
  @Output() event = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  searchBy(searchWords?: string) {
    this.event.emit(searchWords);
  }

  isMobile() {
    let innerWidth = window.innerWidth;
    if (innerWidth < 530) {
      return true;
    } else {
      return false;
    }
  }
}
