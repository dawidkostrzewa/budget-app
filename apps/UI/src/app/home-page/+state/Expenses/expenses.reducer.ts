import { MonthExpesesResponse } from '@budgetapp/category-models';
import { Action, createReducer, on } from '@ngrx/store';
import { ExpensesActions } from './expenses.actions';

export const EXPENSES_FEATURE = 'expenses';

export interface IExpensesState extends MonthExpesesResponse {}

export const expensesInitialState: MonthExpesesResponse = {
  month: '',
  totalPlanned: 0,
  totalReal: 0,
  expenses: [],
  totalIncome: 0,
};

const reducer = createReducer(
  expensesInitialState,
  on(ExpensesActions.loadExpenses, (_, { expenses }) => {
    return { ...expenses };
  })
);

export function expensesReducer(
  state: MonthExpesesResponse | undefined,
  action: Action
): IExpensesState {
  return reducer(state, action);
}
