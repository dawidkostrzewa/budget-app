import { Component, Input, OnInit } from '@angular/core';
import { Transaction, TransactionWithCategoryName } from '../+state/transaction.model';

@Component({
    selector: 'app-category-transactions',
    template: `<ul>
        <li *ngFor="let t of transactions">{{ t.amount }} PLN {{ t.date }} {{ t.categoryName }}</li>
    </ul>`,
    styleUrls: ['./category-transactions.component.scss']
})
export class CategoryTransactionsComponent implements OnInit {
    constructor() {}

    @Input()
    transactions: TransactionWithCategoryName[] | null = [];

    ngOnInit(): void {}
}
