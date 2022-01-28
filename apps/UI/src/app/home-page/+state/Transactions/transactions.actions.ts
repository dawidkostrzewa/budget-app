import { createAction, props } from '@ngrx/store';
import { Category, MainCategory } from '../Category/category.model';
import { Transaction } from './transaction.model';

const loadTransactions = createAction(
  '[Transactions] Load transactions',
  props<{ transactions: Transaction[] }>()
);
const loadCategories = createAction(
  '[Categories] Load Categories',
  props<{ subCategories: Category[] }>()
);
const loadMainCategories = createAction(
  '[Categories] Load Main Categories',
  props<{ mainCategories: MainCategory[] }>()
);

export const TransactionsActions = {
  loadTransactions,
  loadCategories,
  loadMainCategories,
};
