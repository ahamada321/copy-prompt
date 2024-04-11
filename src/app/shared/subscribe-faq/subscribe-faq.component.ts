import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Prompt } from '../../prompt/shared/prompt.model';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-subscribe-faq',
  templateUrl: './subscribe-faq.component.html',
  styleUrls: ['./subscribe-faq.component.scss'],
})
export class SubscribeFaqComponent implements OnInit, OnDestroy {
  constructor(private navbarService: NavbarService) {}

  ngOnInit() {
    this.navbarService.setNavbar();
  }

  ngOnDestroy() {
    this.navbarService.resetNavbar();
  }
}
