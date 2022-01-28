import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromExpenses from './expenses.reducer';

const selectExpensesState = createFeatureSelector<fromExpenses.IExpensesState>(
  fromExpenses.EXPENSES_FEATURE
);

const selectAllExpenses = createSelector(
  selectExpensesState,
  (state) => state.expenses
);

const selectTotalExpenses = createSelector(
  selectExpensesState,
  (state) => state.totalReal
);

const selectTotalIncome = createSelector(
  selectExpensesState,
  (state) => state.totalIncome
);

export const ExpensesSelectors = {
  selectAllExpenses,
  selectTotalExpenses,
  selectTotalIncome,
};
