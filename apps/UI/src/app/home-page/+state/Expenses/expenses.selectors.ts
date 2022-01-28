import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromExpenses from './expenses.reducer';

const selectExpensesState = createFeatureSelector<fromExpenses.IExpensesState>(
  fromExpenses.EXPENSES_FEATURE
);

const selectAllExpenses = createSelector(
  selectExpensesState,
  (state) => state.expenses
);

const selectTotal = createSelector(
  selectExpensesState,
  (state) => state.totalReal
);

export const ExpensesSelectors = {
  selectAllExpenses,
  selectTotal,
};
