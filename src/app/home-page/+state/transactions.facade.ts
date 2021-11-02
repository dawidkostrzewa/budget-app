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

    getCategoriesByMainCategory(mainCategoryId: number) {
        return this.store.select(CategoriesSelectors.selectSubCategoriesByMainCategoryId(mainCategoryId));
    }

    getTransactionsAmountByCategory(catId: number) {
        return this.store
            .select(TransactionsSelectors.selectTransactionsAmountByCategory(catId))
            .pipe(switchMap((amount) => this.getCategoryById(catId).pipe(map((category) => ({ amount, category })))));
    }

    getCategoryById(id: number) {
        return this.store.select(CategoriesSelectors.selectCategoryById(id));
    }

    getTransactionsAmountSummaryByMainCategory(mainCategoryId: number): Observable<CategoryAmountSummary[]> {
        return this.getCategoriesByMainCategory(mainCategoryId).pipe(
            switchMap((categories) =>
                combineLatest(categories.map((cat) => this.getTransactionsAmountByCategory(cat.id)))
            )
        );
    }
}
