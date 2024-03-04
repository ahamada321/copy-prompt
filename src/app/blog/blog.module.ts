import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogChatComponent } from './blog-chat/blog-chat.component';
import { ListCardModule } from '../shared/list-card/list-card.module';
import { BlogDetail2Component } from './blog-detail2/blog-detail2.component';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      { path: 'english', component: BlogDetailComponent },
      { path: 'self-compassion', component: BlogDetail2Component },
    ],
  },
];

@NgModule({
  declarations: [
    BlogComponent,
    BlogDetailComponent,
    BlogDetail2Component,
    BlogChatComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ListCardModule],
  providers: [],
})
export class BlogModule {}
