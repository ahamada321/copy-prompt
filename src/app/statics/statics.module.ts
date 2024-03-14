import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermsComponent } from './terms/terms.component';
import { TermsTextModule } from './terms/helpers/terms-text/terms-text.module';
import { ManualComponent } from './manual/manual.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  { path: 'terms', component: TermsComponent },
  //   { path: 'privacy', component: PrivacyComponent },
  { path: 'manual', component: ManualComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  declarations: [TermsComponent, ManualComponent, Page404Component],
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
