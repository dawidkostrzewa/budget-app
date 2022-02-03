import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { BudgetSelectors } from './budget.selectors';

@Injectable({
  providedIn: 'root',
})
export class BudgetFacade {
  constructor(private readonly store: Store) {}

  isLoading$: Observable<boolean> = this.store.select(
    BudgetSelectors.selectIsLoading
  );

  getExpenses(month: number) {
    return this.store.select(BudgetSelectors.selectCurrentMonthExpenses(month));
  }

  getExpensesAmount(month: number): Observable<number> {
    return this.store.select(
      BudgetSelectors.selectCurrentMonthTotalExpensesAmount(month)
    );
  }

  getIncomeAmount(month: number): Observable<number> {
    return this.store.select(
      BudgetSelectors.selectCurrentMonthTotalIncome(month)
    );
  }

  currentMonth$: Observable<number> = this.store.select(
    BudgetSelectors.selectCurrentMonth
  );
}
