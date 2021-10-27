import { createAction, props } from '@ngrx/store';
import { Category, Transaction } from './home-page.model';

const loadTransactions = createAction('[Transactions] Load transactions', props<{ transactions: Transaction[] }>());
const loadCategories = createAction('[Categories] Load Categories', props<{ categories: Category[] }>());

export const TransactionsActions = {
    loadTransactions,
    loadCategories
};
