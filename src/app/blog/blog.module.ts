import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogChatComponent } from './blog-chat/blog-chat.component';
import { ListCardModule } from '../shared/list-card/list-card.module';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [{ path: 'english', component: BlogDetailComponent }],
  },
];

@NgModule({
  declarations: [BlogComponent, BlogDetailComponent, BlogChatComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ListCardModule],
  providers: [],
})
export class BlogModule {}
