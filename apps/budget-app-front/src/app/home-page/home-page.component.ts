import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { TransactionsFacade } from './+state/transactions.facade';
import { ApiService } from '../api/api.service';
import { CategoryFacade } from './+state/category.facade';
import { TransactionsService } from './+state/transactions.service';
import { map } from 'rxjs/operators';

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
          <mat-card-content>{{ expensesAmount$ | async }}</mat-card-content>
        </mat-card>
        <mat-card
          [ngClass]="(result$ | async)! > 0 ? 'color-green' : 'color-red'"
        >
          <mat-card-title>Do wydania pozostało:</mat-card-title>
          <mat-card-content>{{ result$ | async }}</mat-card-content>
        </mat-card>
      </div>
      <mat-divider></mat-divider>
      <div>
        <h2>Wydatki</h2>
        <div>Suma: {{ expensesAmount$ | async }}</div>
        <mat-tab-group>
          <mat-tab
            *ngFor="let cat of categoryFacade.allMainCategories$ | async"
            [label]="cat.name"
          >
            <app-category-transactions
              [transactions]="
                this.transactionService.getAllTransactionsByMainCategoryName(
                  cat.name
                ) | async
              "
              [summary]="
                (this.transactionService.getTransactionsAmountSummaryByMainCategory(
                  cat.id
                ) | async) || []
              "
            ></app-category-transactions>
          </mat-tab>
        </mat-tab-group>
      </div>
      <mat-divider></mat-divider>
      <div>
        <h2>Wpływy</h2>
        <div>Suma: {{ income }}</div>
      </div>
    </main>
  `,
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private readonly today = new Date();
  currentMonth = this.today.toLocaleString('default', { month: 'long' });
  currentYear = this.today.getFullYear();

  expensesAmount$: Observable<number> | undefined;
  income = 1200;
  result$: Observable<number> = of(0);

  constructor(
    public readonly transactionsFacade: TransactionsFacade,
    public readonly categoryFacade: CategoryFacade,
    public readonly transactionService: TransactionsService,
    public readonly apiService: ApiService
  ) {}

  ngOnInit() {
    this.expensesAmount$ = this.transactionsFacade.expensesAmount$;

    this.result$ = combineLatest([this.expensesAmount$]).pipe(
      map(([expenses]) => this.income - expenses)
    );
  }
}
