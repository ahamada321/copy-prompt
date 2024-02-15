import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-contact-button',
  templateUrl: './contact-button.component.html',
  styleUrls: ['./contact-button.component.scss'],
})
export class ContactButtonComponent implements OnInit {
  constructor(private router: Router, public auth: MyOriginAuthService) {}

  ngOnInit() {}
}
