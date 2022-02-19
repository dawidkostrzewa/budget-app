import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBudget from './budget.reducer';

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

const selectCurrentMonthExpenses = (month: number) =>
  createSelector(selectBudgetByMonth(month), (budget) => {
    return budget?.expenses || [];
  });

const selectCurrentMonthTotalIncome = (month: number) =>
  createSelector(
    selectBudgetByMonth(month),
    (budget) => budget?.totalIncome || 0
  );

const selectCurrentMonthTotalExpensesAmount = (month: number) =>
  createSelector(
    selectBudgetByMonth(month),
    (budget) => budget?.totalReal || 0
  );

const selectCurrentMonth = createSelector(
  selectBudgetState,
  (state) => state.currentMonth
);

const selectIsLoading = createSelector(
  selectBudgetState,
  ({ isLoading }) => isLoading
);

const selectTop10Expenses = (month: number) =>
  createSelector(selectBudgetByMonth(month), (budget) => {
    const allSubCategories = budget?.expenses
      .map(({ subCategories }) => subCategories)
      .flat();
    const top10 = allSubCategories
      ?.sort((a, b) => b.real - a.real)
      .slice(0, 10);
    return top10 || [];
  });

export const BudgetSelectors = {
  selectFullBudget,
  selectBudgetByMonth,
  selectCurrentMonthExpenses,
  selectCurrentMonthTotalIncome,
  selectCurrentMonthTotalExpensesAmount,
  selectCurrentMonth,
  selectIsLoading,
  selectTop10Expenses,
};
