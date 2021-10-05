import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from './home-page.model';
import { HomePageSelectors } from './transactions.selectors';

@Injectable({
    providedIn: 'root'
})
export class TransactionsFacade {
    constructor(private store: Store) {}

    number$: Observable<number> = this.store.select(HomePageSelectors.selectNumber);

    transactions$: Observable<Transaction[]> = this.store.select(HomePageSelectors.selectTransactions);

    allTransactionAmount$: Observable<number> = this.store.select(HomePageSelectors.selectAmountOfTransactions);

    allCategories$: Observable<string[]> = this.store.select(HomePageSelectors.selectAllCategories);

    getAllTransactionsByCategory(category: string): Observable<Transaction[]> {
        return this.store.select(HomePageSelectors.selectTransactionsByCategory(category));
    }
}
