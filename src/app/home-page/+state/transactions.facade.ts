import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesSelectors } from './category.selectors';
import { Category } from './category.model';
import { Transaction, TransactionWithCategoryName } from './transaction.model';
import { TransactionsSelectors } from './transactions.selectors';

@Injectable({
    providedIn: 'root'
})
export class TransactionsFacade {
    constructor(private store: Store) {}

    transactions$: Observable<Transaction[]> = this.store.select(TransactionsSelectors.selectAllTransactions);
    categories$: Observable<Category[]> = this.store.select(CategoriesSelectors.selectAllCategories);

    transactionsWithCategories$: Observable<TransactionWithCategoryName[]> = combineLatest([
        this.transactions$,
        this.categories$
    ]).pipe(
        map(([transactions, categories]) =>
            transactions.map((t: Transaction) => ({
                id: t.id,
                amount: t.amount,
                date: new Date(t.date).getMonth(),
                categoryName: categories.find((c) => c.id === t.categoryId)?.name || 'Not found'
            }))
        )
    );

    expensesAmount$ = this.store.select(TransactionsSelectors.selectExpensesAmount);

    getAllTransactionsByCategoryId(id: number) {
        return this.store.select(TransactionsSelectors.selectTransactionByCategory(id));
    }

    getCategoryById(id: number) {
        return this.store.select(CategoriesSelectors.selectCategoryById(id));
    }
}
