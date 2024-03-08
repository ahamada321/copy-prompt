import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TutorialComponent } from './tutorial/tutorial.component';
import { TermsComponent } from './terms/terms.component';
import { TermsTextModule } from './terms/helpers/terms-text/terms-text.module';
import { ManualComponent } from './manual/manual.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  // { path: 'landing', component: LandingComponent },
  { path: 'terms', component: TermsComponent },
  //   { path: 'privacy', component: PrivacyComponent },
  { path: 'manual', component: ManualComponent },
  { path: 'tutorial', component: TutorialComponent },

  // { path: '', redirectTo: 'prompt', pathMatch: 'full' },
  { path: '**', component: Page404Component },
  // { path: '**', redirectTo: '', pathMatch: 'full' }, // Should show 404 page in the future
];

@NgModule({
  declarations: [
    TermsComponent,
    TutorialComponent,
    ManualComponent,
    Page404Component,
  ],
  exports: [],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TermsTextModule,
  ],
})
export class StaticModule {}
