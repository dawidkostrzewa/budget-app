import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBudget from './budget.reducer';

const CURRENT_MONTH = 'Luty';

const selectBudgetState = createFeatureSelector<fromBudget.IBudgetState>(
  fromBudget.BUDGET_FEATURE
);

const selectBudgetEnities = createSelector(
  selectBudgetState,
  fromBudget.selectors.selectEntities
);

const selectBudgetByMonth = (month: string) =>
  createSelector(selectBudgetEnities, (entities) => entities[month]);

const selectFullBudget = createSelector(
  selectBudgetState,
  fromBudget.selectors.selectAll
);

const selectCurrentMonthExpenses = createSelector(
  selectBudgetByMonth(CURRENT_MONTH),
  (budget) => {
    return budget?.expenses || [];
  }
);

const selectCurrentMonthTotalIncome = createSelector(
  selectBudgetByMonth(CURRENT_MONTH),
  (budget) => budget?.totalIncome || 0
);

const selectCurrentMonthTotalExpensesAmount = createSelector(
  selectBudgetByMonth(CURRENT_MONTH),
  (budget) => budget?.totalReal || 0
);

export const BudgetSelectors = {
  selectFullBudget,
  selectBudgetByMonth,
  selectCurrentMonthExpenses,
  selectCurrentMonthTotalIncome,
  selectCurrentMonthTotalExpensesAmount,
};
