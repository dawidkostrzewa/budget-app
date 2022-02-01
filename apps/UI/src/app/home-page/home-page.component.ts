import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { BudgetFacade } from './+state/Budget/budget.facade';
import { ApiService } from '../api/api.service';
import { CategoryFacade } from './+state/Category/category.facade';
import { TransactionsService } from './+state/Transactions/transactions.service';
import { map, tap } from 'rxjs/operators';
import { CategoryAmountSummary } from './+state/Category/category.model';

@Component({
  selector: 'app-home-page',
  template: `
    <main>
      <h2>{{ currentMonth$ | async | monthToName }} {{ currentYear }}</h2>
      <div class="summary-cards">
        <mat-card class="color-green">
          <mat-card-title>Wpływy</mat-card-title>
          <mat-card-content>
            <span class="summary-cards__content">{{
              budgetFacade.incomeAmount$ | async | price
            }}</span></mat-card-content
          >
        </mat-card>

        <mat-card class="color-red">
          <mat-card-title>Wydatki</mat-card-title>
          <mat-card-content>
            <span class="summary-cards__content">{{
              expensesAmount$ | async | price
            }}</span></mat-card-content
          >
        </mat-card>
        <mat-card
          [ngClass]="(result$ | async)! > 0 ? 'color-green' : 'color-red'"
        >
          <mat-card-title>Do wydania pozostało:</mat-card-title>
          <mat-card-content
            ><span class="summary-cards__content">{{
              result$ | async | price
            }}</span></mat-card-content
          >
        </mat-card>
      </div>
      <mat-divider></mat-divider>
      <div>
        <h2>Wydatki</h2>
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
        <div>Suma: {{ budgetFacade.incomeAmount$ | async | price }}</div>
      </div>
    </main>
  `,
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private readonly today = new Date();
  currentMonth$ = this.budgetFacade.currentMonth$.pipe(
    tap((x) => console.log(x))
  );
  currentYear = this.today.getFullYear();

  expensesAmount$: Observable<number> | undefined;
  incomeAmount$: Observable<number> | undefined;
  result$: Observable<number> = of(0);

  mainCategories$: Observable<string[]> = of([]);

  constructor(
    public readonly budgetFacade: BudgetFacade,
    public readonly categoryFacade: CategoryFacade,
    public readonly transactionService: TransactionsService,
    public readonly apiService: ApiService
  ) {}

  ngOnInit() {
    this.expensesAmount$ = this.budgetFacade.expensesAmount$;
    this.incomeAmount$ = this.budgetFacade.incomeAmount$;

    this.result$ = combineLatest([
      this.expensesAmount$,
      this.incomeAmount$,
    ]).pipe(map(([expenses, income]) => income - expenses));

    this.mainCategories$ = this.budgetFacade.expenses$.pipe(
      map((expenses) => expenses.map((e) => e.mainCategory.name))
    );
  }

  getSummary(categoryName: string): Observable<CategoryAmountSummary[]> {
    return this.budgetFacade.expenses$.pipe(
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
