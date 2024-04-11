import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-user-settings-plan',
  templateUrl: './user-settings-plan.component.html',
  styleUrls: ['./user-settings-plan.component.scss'],
})
export class UserSettingsPlanComponent implements OnInit {
  constructor(private navbarService: NavbarService) {}

  ngOnInit() {}
  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
  }
}
