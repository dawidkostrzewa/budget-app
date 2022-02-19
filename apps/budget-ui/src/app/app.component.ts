import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsActions } from './settings/settings.actions';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <mat-sidenav-container class="example-container">
      <mat-sidenav #sidenav mode="side" [opened]="true" position="end">
        <app-sidebar></app-sidebar>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'UI';

  constructor(private readonly store: Store) {
    this.store.dispatch(SettingsActions.init());
  }
}