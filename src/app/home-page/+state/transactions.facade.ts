import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { CategoriesSelectors } from './category.selectors';
import { Category, MainCategory } from './category.model';
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

    transactionsWithCategories$: Observable<TransactionWithCategoryName[]> = combineLatest([
        this.transactions$,
        this.categories$,
        this.mainCategories$
    ]).pipe(
        map(([transactions, categories, mainCategories]) =>
            transactions.map((t: Transaction) => ({
                id: t.id,
                amount: t.amount,
                date: new Date(t.date).getMonth(),
                categoryName: categories.find((c) => c.id === t.categoryId)?.name || 'Not found',
                mainCategoryName:
                    mainCategories.find((mC) => mC.id === categories.find((c) => c.id === t.categoryId)?.mainCategoryId)
                        ?.name || 'Not found'
            }))
        )
    );

    expensesAmount$ = this.store.select(TransactionsSelectors.selectExpensesAmount);

    getAllTransactionsByCategoryId(id: number) {
        return this.store.select(TransactionsSelectors.selectTransactionByCategory(id));
    }

    getAllTransactionsByMainCategoryName(mainCategoryName: string) {
        return this.transactionsWithCategories$.pipe(
            map((transactions) =>
                transactions.filter((t: TransactionWithCategoryName) => t.mainCategoryName === mainCategoryName)
            )
        );
    }

    getCategoryById(id: number) {
        return this.store.select(CategoriesSelectors.selectCategoryById(id));
    }
}
