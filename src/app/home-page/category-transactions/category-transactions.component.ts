import { Component, Input, OnInit } from '@angular/core';
import { Category, CategoryAmountSummary } from '../+state/category.model';
import { Transaction, TransactionWithCategoryName } from '../+state/transaction.model';

@Component({
    selector: 'app-category-transactions',
    template: `<ul>
        <li *ngFor="let category of summary">
            {{ category.category?.name }} -{{ category.amount }}
            <span></span>
        </li>
    </ul>`,
    styleUrls: ['./category-transactions.component.scss']
})
export class CategoryTransactionsComponent implements OnInit {
    constructor() {}

    @Input()
    transactions: TransactionWithCategoryName[] | null = [];

    @Input()
    summary: CategoryAmountSummary[] | null = [];

    ngOnInit(): void {}
}
