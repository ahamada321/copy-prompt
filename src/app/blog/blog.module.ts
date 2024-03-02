import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [{ path: 'new', component: BlogDetailComponent }],
  },
];

@NgModule({
  declarations: [BlogComponent, BlogDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
})
export class BlogModule {}
