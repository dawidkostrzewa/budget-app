import { Budget } from '@budgetapp/budget-models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { BudgetActions } from '../Budget/budget.actions';
import { getCurrentMonth } from '../../../utils/date.utils';

export const BUDGET_FEATURE = 'budget';

export interface IBudgetState extends EntityState<Budget> {
  currentMonth: number;
}

export const adapter: EntityAdapter<Budget> = createEntityAdapter<Budget>({
  selectId: (model) => model.monthId,
});

export const selectors = adapter.getSelectors();

export const budgetInitialState: IBudgetState = adapter.getInitialState({
  currentMonth: getCurrentMonth(),
});

const reducer = createReducer(
  budgetInitialState,

  on(BudgetActions.loadBudget, (state, { budget }) => {
    return adapter.upsertMany(budget, state);
  })
);

export function budgetReducer(
  state: IBudgetState | undefined,
  action: Action
): IBudgetState {
  return reducer(state, action);
}
