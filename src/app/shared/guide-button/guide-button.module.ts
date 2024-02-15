import { NgModule } from '@angular/core';
import { GuideButtonComponent } from './guide-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule],
  declarations: [GuideButtonComponent],
  exports: [GuideButtonComponent],
})
export class GuideButtonModule {}
