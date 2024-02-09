import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { PromptModule } from './prompt/prompt.module';
import { UserModule } from './user/user.module';
import { StaticModule } from './statics/statics.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule,
    PromptModule,
    UserModule,
    StaticModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
