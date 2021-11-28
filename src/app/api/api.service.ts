import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionsActions } from '../home-page/+state/transactions.actions';
import { Transaction } from '../home-page/+state/transaction.model';
import { Category, MainCategory } from '../home-page/+state/category.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
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
            .get<{ subCategories: Category[] }>('assets/categories.json')
            .subscribe(({ subCategories }) =>
                this.store.dispatch(TransactionsActions.loadCategories({ subCategories }))
            );

        this.http
            .get<{ mainCategories: MainCategory[] }>('assets/main-categories.json')
            .subscribe(({ mainCategories }) =>
                this.store.dispatch(TransactionsActions.loadMainCategories({ mainCategories }))
            );
    }
}
