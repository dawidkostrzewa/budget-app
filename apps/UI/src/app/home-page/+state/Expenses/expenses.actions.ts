import { MonthExpesesResponse } from '@budgetapp/category-models';
import { createAction, props } from '@ngrx/store';

const loadExpenses = createAction(
  '[Expenses][API] Load expenses',
  props<{ expenses: MonthExpesesResponse }>()
);

export const ExpensesActions = {
  loadExpenses,
};
