import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionsActions } from './transactions.actions';
import { Transaction, TransactionWithCategoryName } from './transaction.model';
import { ITransactionsState } from './transactions.reducer';
import { TransactionsFacade } from './transactions.facade';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Category, MainCategory } from './category.model';

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
