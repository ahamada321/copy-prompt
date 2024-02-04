import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-button',
  templateUrl: './contact-button.component.html',
  styleUrls: ['./contact-button.component.scss'],
})
export class ContactButtonComponent implements OnInit {
  constructor(public location: Location) {}

  ngOnInit() {}
}
