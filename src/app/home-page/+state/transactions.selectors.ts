import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HOME_PAGE_FEATURE, ITransactionsState } from './transactions.reducer';

const selectHomePageState = createFeatureSelector<ITransactionsState>(HOME_PAGE_FEATURE);
const selectNumber = createSelector(selectHomePageState, (state) => state.number);
const selectTransactions = createSelector(selectHomePageState, (state) => state.transactions);

const selectAmountOfTransactions = createSelector(selectTransactions, (transactions) =>
    transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
);

const selectAllCategories = createSelector(selectTransactions, (transactions) => [
    ...new Set(transactions.map((transaction) => transaction.category))
]);

export const HomePageSelectors = {
    selectNumber,
    selectTransactions,
    selectAmountOfTransactions,
    selectAllCategories
};
