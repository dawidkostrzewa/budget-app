import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransactionsFacade } from './+state/transactions.facade';
import { HomePageService } from './+state/home-page.service';

@Component({
    selector: 'app-home-page',
    template: `
        <main>
            <h2>Aktualny miesiac: {{ currentMonth }} {{ currentYear }}</h2>
            <div class="summary-cards">
                <mat-card class="color-green">
                    <mat-card-title>Wpływy</mat-card-title>
                    <mat-card-content>{{ income }}</mat-card-content>
                </mat-card>

                <mat-card class="color-red">
                    <mat-card-title>Wydatki</mat-card-title>
                    <!-- <mat-card-content>-{{ transactionsFacade.allTransactionAmount$ | async }}</mat-card-content> -->
                </mat-card>
                <mat-card [ngClass]="result > 0 ? 'color-green' : 'color-red'">
                    <mat-card-title>+/-</mat-card-title>
                    <mat-card-content>{{ result }}</mat-card-content>
                </mat-card>
            </div>
            <div>
                <h2>Kategorie</h2>
                <mat-tab-group>
                    <!-- <mat-tab *ngFor="let cat of transactionsFacade.allCategories$ | async" [label]="cat">
                        <app-category-transactions
                            [transactions]="this.transactionsFacade.getAllTransactionsByCategory(cat) | async"
                        ></app-category-transactions>
                    </mat-tab> -->
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

    income = 2000;
    expense = 1000;
    result = this.income - this.expense;

    constructor(
        public readonly transactionsFacade: TransactionsFacade,
        private readonly homePageService: HomePageService
    ) {}

    ngOnInit() {
        this.transactionsFacade.transactions$.subscribe((x) => console.log(x));
    }
}
