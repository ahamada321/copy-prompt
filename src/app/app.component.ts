import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MyOriginAuthService } from './auth/shared/auth.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  titlee!: string; // Added by Hamada
  private lastPoppedUrl?: string;
  private yScrollStack: number[] = [];
  @ViewChild(NavbarComponent, { static: false }) navbar!: NavbarComponent;

  constructor(
    private meta: Meta,
    private renderer: Renderer2,
    private router: Router,
    public location: Location,
    public auth: MyOriginAuthService,
    private gtmService: GoogleTagManagerService
  ) {
    this.gtmService.addGtmToDom();
  }

  @HostListener('window:scroll', ['$event'])
  hasScrolled() {
    var st = window.pageYOffset;
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    let navbar = document.getElementsByTagName('nav')[0];

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      if (navbar.classList.contains('nav-down')) {
        navbar.classList.remove('nav-down');
        navbar.classList.add('nav-up');
      }
    } else {
      // Scroll Up
      if (st + window.innerHeight < document.body.scrollHeight) {
        if (navbar.classList.contains('nav-up')) {
          navbar.classList.remove('nav-up');
          navbar.classList.add('nav-down');
        }
      }
    }
    lastScrollTop = st;
  }

  ngOnInit() {
    this.meta.addTags([
      {
        name: 'keywords',
        content:
          'GPT, プロンプト, テンプレ, 無料, Webライター, マーケター, 文章作成, 要約',
      },
      {
        name: 'description',
        content:
          'ChatGPTやBingで使える超高品質なプロンプトのテンプレが無料で手に入るサービスです',
      },
      {
        property: 'og:description',
        content:
          'ChatGPTやBingで使える超高品質なプロンプトのテンプレが無料で手に入るサービスです',
      },
    ]);

    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        this.navbar.sidebarClose();

        // Below code is using at Bottom Nav bar.
        const locationPath = this.location.prepareExternalUrl(
          this.location.path()
        );
        this.titlee = locationPath.slice(1);
        // Bottom Nab bar control end.

        this.renderer.listen('window', 'scroll', (event) => {
          const number = window.scrollY;
          if (number > 150 || window.pageYOffset > 150) {
            // add logic
            navbar.classList.remove('navbar-transparent');
          } else {
            // remove logic
            navbar.classList.add('navbar-transparent');
          }
        });

        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop()!);
        } else window.scrollTo(0, 0);
      }
    });

    // var ua = window.navigator.userAgent;
    // var trident = ua.indexOf('Trident/');
    // if (trident > 0) {
    //   // IE 11 => return version number
    //   var rv = ua.indexOf('rv:');
    //   var version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    // }
    // if (version!) {
    //   var body = document.getElementsByTagName('body')[0];
    //   body.classList.add('ie-background');
    // }

    this.hasScrolled();
  }

  // removeFooter() {
  //   var titlee = this.location.prepareExternalUrl(this.location.path());
  //   titlee = titlee.slice(1);
  //   if (titlee === 'register') {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  isMobile() {
    let innerWidth = window.innerWidth;
    if (innerWidth < 530) {
      return true;
    } else {
      return false;
    }
  }
}
