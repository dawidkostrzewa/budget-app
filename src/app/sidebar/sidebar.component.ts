import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionsFacade } from '../home-page/+state/transactions.facade';

@Component({
    selector: 'app-sidebar',
    template: `<aside>
        <h2 class="sidebar-title">Ostatnie transakcje</h2>
        <mat-list>
            <ng-container *ngFor="let transaction of transactionsFacade.transactions$ | async">
                <mat-list-item>{{ transaction.amount }} PLN - {{ transaction.category }}</mat-list-item>
                <mat-divider></mat-divider>
            </ng-container>
        </mat-list>
    </aside>`,
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
    constructor(private store: Store, public readonly transactionsFacade: TransactionsFacade) {}

    ngOnInit(): void {}
}
