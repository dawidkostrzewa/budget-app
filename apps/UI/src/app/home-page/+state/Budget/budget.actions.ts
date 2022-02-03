import { BudgetResponse } from '@budgetapp/budget-models';
import { createAction, props } from '@ngrx/store';

const loadBudget = createAction('[API] Load Budget', props<BudgetResponse>());

const showNextMonth = createAction('[UI] Show Next Month');
const showPrevMonth = createAction('[UI] Show Prev Month');

const bugdetRecived = createAction(
  '[API] Bugdet Reciced',
  props<BudgetResponse>()
);

export const BudgetActions = {
  loadBudget,
  showNextMonth,
  showPrevMonth,
  bugdetRecived,
};
