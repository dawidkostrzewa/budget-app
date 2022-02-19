import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { BudgetActions } from './budget.actions';
import { SettingsActions } from '../settings/settings.actions';
import { Budget } from '@budgetapp/shared/budget-models';
import { getCurrentMonth } from '@budgetapp/budget-ui/util';

export const BUDGET_FEATURE = 'budget';

export interface IBudgetState extends EntityState<Budget> {
  currentMonth: number;
  isLoading: boolean;
}

export const adapter: EntityAdapter<Budget> = createEntityAdapter<Budget>({
  selectId: (model) => model.monthId,
});

export const selectors = adapter.getSelectors();

export const budgetInitialState: IBudgetState = adapter.getInitialState({
  currentMonth: getCurrentMonth(),
  isLoading: true,
});

const reducer = createReducer(
  budgetInitialState,

  // on(BudgetActions.loadBudget, (state, { budget }) => {
  //   return adapter.upsertMany(budget, state);
  // }),
  on(SettingsActions.init, (state) => {
    return { ...state, isLoading: true };
  }),
  on(BudgetActions.bugdetRecived, (state, { budget }) => {
    return adapter.upsertMany(budget, { ...state, isLoading: false });
  }),
  on(BudgetActions.showNextMonth, (state) => {
    return { ...state, currentMonth: state.currentMonth + 1 };
  }),
  on(BudgetActions.showPrevMonth, (state) => {
    return { ...state, currentMonth: state.currentMonth - 1 };
  })
);

export function budgetReducer(
  state: IBudgetState | undefined,
  action: Action
): IBudgetState {
  return reducer(state, action);
}
