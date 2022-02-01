import { BudgetResponse } from '@budgetapp/budget-models';
import { createAction, props } from '@ngrx/store';

const loadBudget = createAction('[API] Load Budget', props<BudgetResponse>());

export const BudgetActions = {
  loadBudget,
};
