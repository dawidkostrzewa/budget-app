import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, merge, Observable } from 'rxjs';
import { combineAll, map, mergeAll, switchMap, withLatestFrom } from 'rxjs/operators';
import { CategoriesSelectors } from './category.selectors';
import { Category, CategoryAmountSummary, MainCategory } from './category.model';
import { Transaction, TransactionWithCategoryName } from './transaction.model';
import { TransactionsSelectors } from './transactions.selectors';

@Injectable({
    providedIn: 'root'
})
export class TransactionsFacade {
    constructor(private store: Store) {}

    transactions$: Observable<Transaction[]> = this.store.select(TransactionsSelectors.selectAllTransactions);
    categories$: Observable<Category[]> = this.store.select(CategoriesSelectors.selectAllCategories);
    mainCategories$: Observable<MainCategory[]> = this.store.select(CategoriesSelectors.selectAllMainCategories);
    expensesAmount$ = this.store.select(TransactionsSelectors.selectExpensesAmount);

    getAllTransactionsByCategoryId(id: number) {
        return this.store.select(TransactionsSelectors.selectTransactionByCategory(id));
    }

    getCategoriesByMainCategory(mainCategoryId: number) {
        return this.store.select(CategoriesSelectors.selectSubCategoriesByMainCategoryId(mainCategoryId));
    }

    getTransactionsAmountByCategory(categoryId: number): Observable<number> {
        return this.store.select(TransactionsSelectors.selectTransactionsAmountByCategory(categoryId));
    }

    getCategoryById(id: number) {
        return this.store.select(CategoriesSelectors.selectCategoryById(id));
    }
}
