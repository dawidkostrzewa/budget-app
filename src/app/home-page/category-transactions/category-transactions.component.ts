import { Component, Input, OnInit } from '@angular/core';
import { CategoryAmountSummary } from '../+state/category.model';
import { TransactionWithCategoryName } from '../+state/transaction.model';

//TODO add sorting/pagination
@Component({
    selector: 'app-category-transactions',
    template: `<table mat-table [dataSource]="summary" class="mat-elevation-z8">
        <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>Kategoria</th>
            <td mat-cell *matCellDef="let element">{{ element.category.name }}</td>
        </ng-container>

        <ng-container matColumnDef="amount">
            <th mat-header-cell *matHeaderCellDef>Suma</th>
            <td mat-cell *matCellDef="let element">{{ element.amount }} PLN</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table> `,
    styleUrls: ['./category-transactions.component.scss']
})
export class CategoryTransactionsComponent {
    constructor() {}

    @Input()
    transactions: TransactionWithCategoryName[] | null = [];

    @Input()
    summary: CategoryAmountSummary[] = [];

    displayedColumns: string[] = ['category', 'amount'];
}
