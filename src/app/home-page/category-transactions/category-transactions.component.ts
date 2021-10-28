import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../+state/transaction.model';

@Component({
    selector: 'app-category-transactions',
    template: `<ul>
        <li *ngFor="let t of transactions">{{ t.amount }} PLN {{ t.date }}</li>
    </ul>`,
    styleUrls: ['./category-transactions.component.scss']
})
export class CategoryTransactionsComponent implements OnInit {
    constructor() {}

    @Input()
    transactions: Transaction[] | null = [];

    ngOnInit(): void {}
}
