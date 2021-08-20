import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomePageActions } from './home-page.actions';
import { Transaction } from './home-page.model';

@Injectable({
    providedIn: 'root'
})
export class HomePageService {
    constructor(private http: HttpClient, private store: Store) {}

    loadTransactions() {
        this.http
            .get<Transaction[]>('assets/transactions.json')
            .subscribe((transactions) => this.store.dispatch(HomePageActions.loadTransactions({ transactions })));
    }
}
