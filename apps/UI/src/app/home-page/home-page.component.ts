import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { TransactionsFacade } from './+state/Transactions/transactions.facade';
import { ApiService } from '../api/api.service';
import { CategoryFacade } from './+state/Category/category.facade';
import { TransactionsService } from './+state/Transactions/transactions.service';
import { map, single } from 'rxjs/operators';
import { CategoryAmountSummary } from './+state/Category/category.model';

@Component({
  selector: 'app-home-page',
  template: `
    <main>
      <h2>Aktualny miesiac: {{ currentMonth }} {{ currentYear }}</h2>
      <div class="summary-cards">
        <mat-card class="color-green">
          <mat-card-title>Wpływy</mat-card-title>
          <mat-card-content>{{
            transactionsFacade.incomeAmount$ | async | price
          }}</mat-card-content>
        </mat-card>

        <mat-card class="color-red">
          <mat-card-title>Wydatki</mat-card-title>
          <mat-card-content>{{
            expensesAmount$ | async | price
          }}</mat-card-content>
        </mat-card>
        <mat-card
          [ngClass]="(result$ | async)! > 0 ? 'color-green' : 'color-red'"
        >
          <mat-card-title>Do wydania pozostało:</mat-card-title>
          <mat-card-content>{{ result$ | async | price }}</mat-card-content>
        </mat-card>
      </div>
      <mat-divider></mat-divider>
      <div>
        <h2>Wydatki</h2>
        <div>Suma: {{ expensesAmount$ | async | price }}</div>
        <mat-tab-group>
          <mat-tab
            *ngFor="let cat of mainCategories$ | async as mainCategories"
            [label]="cat"
          >
            <app-category-transactions
              [summary]="(getSummary(cat) | async) || []"
            ></app-category-transactions>
          </mat-tab>
        </mat-tab-group>
      </div>
      <mat-divider></mat-divider>
      <div>
        <h2>Wpływy</h2>
        <div>Suma: {{ transactionsFacade.incomeAmount$ | async | price }}</div>
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
  incomeAmount$: Observable<number> | undefined;
  income = 1200;
  result$: Observable<number> = of(0);

  mainCategories$: Observable<string[]> = of([]);

  constructor(
    public readonly transactionsFacade: TransactionsFacade,
    public readonly categoryFacade: CategoryFacade,
    public readonly transactionService: TransactionsService,
    public readonly apiService: ApiService
  ) {}

  ngOnInit() {
    this.expensesAmount$ = this.transactionsFacade.expensesAmount$;
    this.incomeAmount$ = this.transactionsFacade.incomeAmount$;

    this.result$ = combineLatest([
      this.expensesAmount$,
      this.incomeAmount$,
    ]).pipe(map(([expenses, income]) => income - expenses));

    this.mainCategories$ = this.transactionsFacade.expenses$.pipe(
      map((expenses) => expenses.map((e) => e.mainCategory.name))
    );
  }

  getSummary(categoryName: string): Observable<CategoryAmountSummary[]> {
    return this.transactionsFacade.expenses$.pipe(
      map((expenses) =>
        expenses.find((e) => e.mainCategory.name === categoryName)
      ),
      map((singleCategory) => singleCategory?.subCategories),
      map((subCategories) =>
        subCategories
          ? subCategories?.map((subCategory) => ({
              category: subCategory.name,
              amount: subCategory.real,
            }))
          : []
      )
    );
  }
}
