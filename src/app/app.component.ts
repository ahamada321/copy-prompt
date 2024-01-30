import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { filter, Subscription } from 'rxjs';

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
  private _router!: Subscription;
  private lastPoppedUrl?: string;
  private yScrollStack: number[] = [];
  url!: string;
  @ViewChild(NavbarComponent, { static: false }) navbar!: NavbarComponent;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private element: ElementRef,
    public location: Location
  ) {}

  @HostListener('window:scroll', ['$event'])
  hasScrolled() {
    var st = window.pageYOffset;
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    var navbar = document.getElementsByTagName('nav')[0];

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
    var navbar: HTMLElement =
      this.element.nativeElement.children[0].children[0];

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop()!);
        } else window.scrollTo(0, 0);
      }
    });

    this._router = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.navbar.sidebarClose();

        // Below code is using at Bottom Nav bar.
        if (event instanceof NavigationEnd) {
          const locationPath = this.location.prepareExternalUrl(
            this.location.path()
          );
          this.titlee = locationPath.slice(1);
        }
        // Bottom Nab bar control end.

        this.renderer.listen('window', 'scroll', (event) => {
          const number = window.scrollY;
          var _locationSections = this.location.path();
          _locationSections = _locationSections.split('#')[0];

          var _locationExamples = this.location.path();
          _locationExamples = _locationExamples.split('/')[2];
          if (number > 150 || window.pageYOffset > 150) {
            // add logic
            navbar.classList.remove('navbar-transparent');
          } else if (
            _locationExamples !== 'contactus' &&
            _locationExamples !== 'login' &&
            _locationExamples !== 'register' &&
            _locationExamples !== 'search'
          ) {
            // remove logic
            navbar.classList.add('navbar-transparent');
          }
        });
      });

    var ua = window.navigator.userAgent;
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      var version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    if (version!) {
      var body = document.getElementsByTagName('body')[0];
      body.classList.add('ie-background');
    }
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
    if (innerWidth < 560) {
      return true;
    } else {
      return false;
    }
  }
}
