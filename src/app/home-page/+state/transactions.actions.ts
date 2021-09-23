import { createAction, props } from '@ngrx/store';
import { Transaction } from './home-page.model';

export const increment = createAction('[Counter Component] Increment');

const loadTransactions = createAction('[Transactions] Load transactions', props<{ transactions: Transaction[] }>());

export const TransactionsActions = {
    increment,
    loadTransactions
};
