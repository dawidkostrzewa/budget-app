import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransactionsService } from '../home-page/+state/transactions.service';

@Component({
    selector: 'app-sidebar',
    template: `<aside>
        <h2 class="sidebar-title">Ostatnie 3 transakcje</h2>
        <mat-list>
            <ng-container
                *ngFor="let transaction of (transactionService.getTransactionsWithCategories() | async)?.slice(0, 3)"
            >
                <mat-list-item
                    >{{ transaction.amount }} PLN - {{ transaction.mainCategoryName }}
                    {{ transaction.date }}</mat-list-item
                >
                <mat-divider></mat-divider>
            </ng-container>
        </mat-list>
    </aside>`,
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    constructor(public readonly transactionService: TransactionsService) {}
}
