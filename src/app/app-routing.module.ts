import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaticModule } from './statics/statics.module';
import { AuthModule } from './auth/auth.module';
import { RentalModule } from './rental/rental.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule,
    StaticModule,
    RentalModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
