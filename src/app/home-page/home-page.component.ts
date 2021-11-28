import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransactionsFacade } from './+state/transactions.facade';
import { HomePageService } from './+state/home-page.service';
import { CategoryFacade } from './+state/category.facade';
import { Observable } from 'rxjs';
import { CategoryAmountSummary } from './+state/category.model';
import { map } from 'rxjs/operators';
import { TransactionsService } from './+state/transactions.service';

@Component({
    selector: 'app-home-page',
    template: `
        <main>
            <h2>Aktualny miesiac: {{ currentMonth }} {{ currentYear }}</h2>
            <div class="summary-cards">
                <mat-card class="color-green">
                    <mat-card-title>Wpływy</mat-card-title>
                    <mat-card-content>{{ expense }}</mat-card-content>
                </mat-card>

                <mat-card class="color-red">
                    <mat-card-title>Wydatki</mat-card-title>
                    <mat-card-content>{{ income$ | async }}</mat-card-content>
                </mat-card>
                <mat-card [ngClass]="result > 0 ? 'color-green' : 'color-red'">
                    <mat-card-title>+/-</mat-card-title>
                    <mat-card-content>{{ result }}</mat-card-content>
                </mat-card>
            </div>
            <div>
                <h2>Kategorie</h2>
                <mat-tab-group>
                    <mat-tab *ngFor="let cat of categoryFacade.allMainCategories$ | async" [label]="cat.name">
                        <app-category-transactions
                            [transactions]="
                                this.transactionService.getAllTransactionsByMainCategoryName(cat.name) | async
                            "
                            [summary]="
                                (this.transactionService.getTransactionsAmountSummaryByMainCategory(cat.id) | async) ||
                                []
                            "
                        ></app-category-transactions>
                    </mat-tab>
                </mat-tab-group>
            </div>
        </main>
    `,
    styleUrls: ['./home-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
    private readonly today = new Date();
    currentMonth = this.today.toLocaleString('default', { month: 'long' });
    currentYear = this.today.getFullYear();

    income$: Observable<number> | undefined;
    expense = 1000;
    result = 0;

    constructor(
        public readonly transactionsFacade: TransactionsFacade,
        public readonly categoryFacade: CategoryFacade,
        public readonly transactionService: TransactionsService,
        public readonly homePageService: HomePageService
    ) {}

    ngOnInit() {
        this.income$ = this.transactionsFacade.expensesAmount$;
    }
}
