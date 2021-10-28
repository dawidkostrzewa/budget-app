import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionsActions } from './transactions.actions';
import { Transaction, TransactionWithCategoryName } from './transaction.model';
import { ITransactionsState } from './transactions.reducer';
import { TransactionsFacade } from './transactions.facade';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Category } from './category.model';

@Injectable({
    providedIn: 'root'
})
export class HomePageService {
    constructor(private readonly http: HttpClient, private readonly store: Store) {
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
}
