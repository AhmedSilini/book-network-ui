import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {RouterLink} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Run this code only in the browser
      const linkColor = document.querySelectorAll('.nav-link');
      linkColor.forEach((link) => {
        if (window.location.href.endsWith(link.getAttribute('href') || '')) {
          link.classList.add('active');
        }
        link.addEventListener('click', () => {
          linkColor.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
