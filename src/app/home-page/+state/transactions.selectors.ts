import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRANSTACTIONS_FEATURE, ITransactionsState } from './transactions.reducer';
import * as fromTransactions from './transactions.reducer';
import { Transaction } from './transaction.model';

const selectTransactionsState = createFeatureSelector<fromTransactions.ITransactionsState>(TRANSTACTIONS_FEATURE);
const selectTransactionsEntites = createSelector(selectTransactionsState, (state) =>
    fromTransactions.selectors.selectEntities(state)
);

const selectAllTransactions = createSelector(selectTransactionsState, fromTransactions.selectors.selectAll);

const selectExpensesAmount = createSelector(selectAllTransactions, (transactions) =>
    transactions.reduce((acc, transaction) => {
        return transaction.amount + acc;
    }, 0)
);

const selectTransactionByCategory = (catId: number) =>
    createSelector(selectAllTransactions, (transaction) =>
        transaction.filter((transaction: Transaction) => transaction.categoryId === catId)
    );

export const TransactionsSelectors = {
    selectAllTransactions,
    selectExpensesAmount,
    selectTransactionByCategory
};
