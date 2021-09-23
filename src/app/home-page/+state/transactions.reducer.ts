import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Transaction } from './home-page.model';
import { TransactionsActions } from './transactions.actions';

export const HOME_PAGE_FEATURE = 'home-page';

export interface ITransactionsState {
    number: number;
    transactions: Transaction[];
}

export const adapter: EntityAdapter<ITransactionsState> = createEntityAdapter<ITransactionsState>({
    selectId: (state: ITransactionsState) => state.number
});

export const transactionsInitialState: ITransactionsState = adapter.getInitialState({
    number: 0,
    transactions: []
});

const reducer = createReducer(
    transactionsInitialState,
    on(TransactionsActions.increment, (state) => {
        return {
            ...state,
            number: state.number + 1
        };
    }),
    on(TransactionsActions.loadTransactions, (state, { transactions }) => {
        return { ...state, transactions: transactions };
    })
);

export function transactionsReducer(state: ITransactionsState | undefined, action: Action): ITransactionsState {
    return reducer(state, action);
}
