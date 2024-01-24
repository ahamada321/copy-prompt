import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { QuillConfigModule, QuillModule } from 'ngx-quill';
import hljs from 'highlight.js';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    QuillConfigModule.forRoot({
      modules: {
        syntax: { highlight: (text: string) => hljs.highlightAuto(text).value },
        toolbar: [
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ color: [] }, { background: [] }],
          ['bold', 'underline'],
          ['code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
      },
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
