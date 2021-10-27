import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Transaction } from './home-page.model';
import { TransactionsActions } from './transactions.actions';

export const TRANSTACTIONS_FEATURE = 'transactions';

export interface ITransactionsState extends EntityState<Transaction> {}

export const adapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>({});

export const selectors = adapter.getSelectors();

export const transactionsInitialState = adapter.getInitialState({});

const reducer = createReducer(
    transactionsInitialState,

    on(TransactionsActions.loadTransactions, (state, { transactions }) => {
        return adapter.upsertMany(transactions, state);
    })
);

export function transactionsReducer(state: ITransactionsState | undefined, action: Action): ITransactionsState {
    return reducer(state, action);
}
