import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoriesSelectors } from './categories.selectors';
import { Category, Transaction } from './home-page.model';
import { TransactionsSelectors } from './transactions.selectors';

@Injectable({
    providedIn: 'root'
})
export class TransactionsFacade {
    constructor(private store: Store) {}

    transactions$: Observable<Transaction[]> = this.store.select(TransactionsSelectors.selectAllTransactions);
    categories$: Observable<Category[]> = this.store.select(CategoriesSelectors.selectAllCategories);

    // allTransactionAmount$: Observable<number> = this.store.select(HomePageSelectors.selectAmountOfTransactions);

    // allCategories$: Observable<Category[]> = this.store.select(HomePageSelectors.selectAllCategories);

    // getAllTransactionsByCategory(category: string): Observable<Transaction[]> {
    //     return this.store.select(HomePageSelectors.selectTransactionsByCategory(category));
    // }

    getCategoryById(id: number) {
        return this.store.select(CategoriesSelectors.selectCategoryById(id));
    }
}
