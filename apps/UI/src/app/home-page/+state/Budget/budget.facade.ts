import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { BudgetSelectors } from './budget.selectors';

@Injectable({
  providedIn: 'root',
})
export class BudgetFacade {
  constructor(private readonly store: Store) {}

  expensesAmount$: Observable<number> = this.store.select(
    BudgetSelectors.selectCurrentMonthTotalExpensesAmount
  );
  incomeAmount$: Observable<number> = this.store.select(
    BudgetSelectors.selectCurrentMonthTotalIncome
  );

  expenses$ = this.store.select(BudgetSelectors.selectCurrentMonthExpenses);
}
