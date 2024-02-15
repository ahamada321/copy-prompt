import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-guide-button',
  templateUrl: './guide-button.component.html',
  styleUrls: ['./guide-button.component.scss'],
})
export class GuideButtonComponent implements OnInit {
  constructor(private router: Router, public auth: MyOriginAuthService) {}

  ngOnInit() {}
}
