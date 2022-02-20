import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BudgetFacade } from '@budgetapp/budget-ui/data-access';
import { SingleCategory } from '@budgetapp/shared/budget-models';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  template: `<aside>
    <h2 class="sidebar-title">Top 10 wydatków</h2>
    <mat-list>
      <ng-container
        *ngFor="let expense of top10Expenses$ | async; let i = index"
      >
        <mat-list-item
          >{{ i + 1 }}. {{ expense.name }} -
          {{ expense.real | price }}</mat-list-item
        >
        <mat-divider></mat-divider>
      </ng-container>
    </mat-list>
  </aside>`,
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  constructor(private readonly budgetFacade: BudgetFacade) {}

  top10Expenses$: Observable<SingleCategory[]> =
    this.budgetFacade.currentMonth$.pipe(
      switchMap((month) => this.budgetFacade.getTop10Expenses(month))
    );
}
