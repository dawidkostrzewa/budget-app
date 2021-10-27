import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionsActions } from './transactions.actions';
import { Category, Transaction, TransactionWithCategoryName } from './home-page.model';
import { ITransactionsState } from './transactions.reducer';
import { TransactionsFacade } from './transactions.facade';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HomePageService {
    constructor(
        private http: HttpClient,
        private store: Store,
        private readonly transactionFacade: TransactionsFacade
    ) {
        this.loadCategories();
        this.loadTransactions();
    }

    loadTransactions() {
        this.http
            .get<{ transactions: Transaction[] }>('assets/transactions.json')
            .subscribe(({ transactions }) =>
                this.store.dispatch(TransactionsActions.loadTransactions({ transactions }))
            );
    }

    loadCategories() {
        this.http
            .get<{ categories: Category[] }>('assets/categories.json')
            .subscribe(({ categories }) => this.store.dispatch(TransactionsActions.loadCategories({ categories })));
    }

    cc(categories: any[]) {
        [].map((t: Transaction) => ({
            id: t.id,
            amount: t.amount,
            categoryName: categories.find((c) => c.id === t.id)?.name
        }));
    }

    getTransactionWithCategoryNames(): Observable<TransactionWithCategoryName[]> {
        return combineLatest([this.transactionFacade.transactions$, this.transactionFacade.categories$]).pipe(
            map(([transactions, categories]) =>
                transactions.map((t: Transaction) => ({
                    id: t.id,
                    amount: t.amount,
                    categoryName: categories.find((c) => c.id === t.categoryId)?.name || 'Not found'
                }))
            )
        );
    }
}
