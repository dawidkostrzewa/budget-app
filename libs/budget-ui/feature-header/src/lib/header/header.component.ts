import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <header class="main-header">
        <h1 class="header-title"><a routerLink="/">Personal Budget App</a></h1>
        <span class="example-spacer"></span>
        <!-- TODO: Features to be -->
        <!-- <a routerLink="#">Zaplanuj kolejny miesiąc</a> -->
        <!-- <a routerLink="/year-summary">Podsumowanie roku</a> -->
      </header>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor() {}
}
