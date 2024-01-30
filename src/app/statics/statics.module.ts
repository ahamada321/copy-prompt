import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SubscriptionFormModule } from "../shared/subscription-form/subscription-form.module";
import { LandingComponent } from './landing/landing.component';
import { TermsComponent } from './terms/terms.component';
import { TermsTextModule } from './terms/helpers/terms-text/terms-text.module';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'terms', component: TermsComponent },
  //   { path: 'privacy', component: PrivacyComponent },
  { path: 'tutorial', component: TutorialComponent },
  //   { path: 'aboutus', component: AboutusComponent },

  { path: '', redirectTo: 'prompt', pathMatch: 'full' },
  // { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [LandingComponent, TermsComponent, TutorialComponent],
  exports: [],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    // SubscriptionFormModule,
    TermsTextModule,
  ],
})
export class StaticModule {}
