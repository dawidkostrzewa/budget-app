import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `<aside>
    <h2 class="sidebar-title">Top 5 transakcji</h2>
    <mat-list>
      <ng-container *ngFor="let transaction of [1, 2, 3]">
        <mat-list-item>{{ transaction }}</mat-list-item>
        <mat-divider></mat-divider>
      </ng-container>
    </mat-list>
  </aside>`,
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
