import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionsActions } from '../home-page/+state/transactions.actions';
import { Transaction } from '../home-page/+state/transaction.model';
import { Category, MainCategory } from '../home-page/+state/category.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store
  ) {
    this.loadCategories();
    this.loadTransactions();
  }

  API_URL = 'http://localhost:3333/api';

  loadTransactions() {
    this.http
      .get<{ transactions: Transaction[] }>(`${this.API_URL}/transactions`)
      .subscribe(({ transactions }) =>
        this.store.dispatch(
          TransactionsActions.loadTransactions({ transactions })
        )
      );
  }

  loadCategories() {
    this.http
      .get<{ subCategories: Category[] }>(`${this.API_URL}/sub-categories`)
      .subscribe(({ subCategories }) =>
        this.store.dispatch(
          TransactionsActions.loadCategories({ subCategories })
        )
      );

    this.http
      .get<{ mainCategories: MainCategory[] }>(`${this.API_URL}/categories`)
      .subscribe(({ mainCategories }) =>
        this.store.dispatch(
          TransactionsActions.loadMainCategories({ mainCategories })
        )
      );
  }
}
