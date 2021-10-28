import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionsFacade } from '../home-page/+state/transactions.facade';

@Component({
    selector: 'app-sidebar',
    template: `<aside>
        <h2 class="sidebar-title">Ostatnie 3 transakcje</h2>
        <mat-list>
            <ng-container
                *ngFor="let transaction of (transactionFacade.transactionsWithCategories$ | async)?.slice(0, 3)"
            >
                <mat-list-item
                    >{{ transaction.amount }} PLN - {{ transaction.categoryName }} {{ transaction.date }}</mat-list-item
                >
                <mat-divider></mat-divider>
            </ng-container>
        </mat-list>
    </aside>`,
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
    constructor(private store: Store, public readonly transactionFacade: TransactionsFacade) {}

    ngOnInit(): void {}
}
