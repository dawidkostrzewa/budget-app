import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomePageService } from '../home-page/+state/home-page.service';
import { TransactionsFacade } from '../home-page/+state/transactions.facade';

@Component({
    selector: 'app-sidebar',
    template: `<aside>
        <h2 class="sidebar-title">Ostatnie transakcje</h2>
        <mat-list>
            <ng-container *ngFor="let transaction of hpService.getTransactionWithCategoryNames() | async">
                <mat-list-item>{{ transaction.amount }} PLN - {{ transaction.categoryName }}</mat-list-item>
                <mat-divider></mat-divider>
            </ng-container>
        </mat-list>
    </aside>`,
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
    constructor(private store: Store, public readonly hpService: HomePageService) {}

    ngOnInit(): void {}
}
