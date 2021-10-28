import { createAction, props } from '@ngrx/store';
import { Category } from './category.model';
import { Transaction } from './transaction.model';

const loadTransactions = createAction('[Transactions] Load transactions', props<{ transactions: Transaction[] }>());
const loadCategories = createAction('[Categories] Load Categories', props<{ categories: Category[] }>());

export const TransactionsActions = {
    loadTransactions,
    loadCategories
};
