import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent implements OnInit {
  @Input() titlee!: string;

  constructor(public location: Location) {}

  ngOnInit() {}

  onClick() {
    const locationPath = this.location.prepareExternalUrl(this.location.path());
    this.titlee = locationPath.split('/')[1];
  }
}
