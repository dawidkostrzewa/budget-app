import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRANSTACTIONS_FEATURE, ITransactionsState } from './transactions.reducer';
import * as fromTransactions from './transactions.reducer';

const selectTransactionsState = createFeatureSelector<fromTransactions.ITransactionsState>(TRANSTACTIONS_FEATURE);
const selectTransactionsEntites = createSelector(selectTransactionsState, (state) =>
    fromTransactions.selectors.selectEntities(state)
);

const selectAllTransactions = createSelector(selectTransactionsState, fromTransactions.selectors.selectAll);

export const TransactionsSelectors = {
    selectAllTransactions
};
