import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaticModule } from './statics/statics.module';
import { AuthModule } from './auth/auth.module';
import { PromptModule } from './prompt/prompt.module';
import { UserModule } from './user/user.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule,
    StaticModule,
    PromptModule,
    UserModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
