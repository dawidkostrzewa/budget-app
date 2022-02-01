import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBudget from './budget.reducer';
import { getCurrentMonth } from '../../../utils/date.utils';

const CURRENT_MONTH = getCurrentMonth();

const selectBudgetState = createFeatureSelector<fromBudget.IBudgetState>(
  fromBudget.BUDGET_FEATURE
);

const selectBudgetEnities = createSelector(
  selectBudgetState,
  fromBudget.selectors.selectEntities
);

const selectBudgetByMonth = (month: number) =>
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

const selectCurrentMonth = createSelector(
  selectBudgetState,
  (state) => state.currentMonth
);

export const BudgetSelectors = {
  selectFullBudget,
  selectBudgetByMonth,
  selectCurrentMonthExpenses,
  selectCurrentMonthTotalIncome,
  selectCurrentMonthTotalExpensesAmount,
  selectCurrentMonth,
};
