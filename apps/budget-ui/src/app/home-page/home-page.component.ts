import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { BudgetFacade } from '../budget/budget.facade';
import { map, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { BudgetActions } from '../budget/budget.actions';
import { CategoryAmountSummary } from '../budget/budget.models';

@Component({
  selector: 'app-home-page',
  template: `
    <main>
      <div
        class="navigation"
        [ngClass]="(currentMonth$ | async) === 0 ? 'navigation--end' : ''"
      >
        <button
          *ngIf="(currentMonth$ | async) !== 0"
          (click)="goToPrevMonth()"
          mat-stroked-button
        >
          Poprzedni miesiąc
        </button>
        <button
          *ngIf="(currentMonth$ | async) !== 11"
          (click)="goToNextMonth()"
          mat-stroked-button
        >
          Następny miesiąc
        </button>
      </div>
      <h2>{{ currentMonth$ | async | monthToName }} {{ currentYear }}</h2>
      <div class="summary-cards">
        <mat-card class="color-green">
          <ng-container *ngIf="(isLoading$ | async) === false">
            <mat-card-title>Wpływy</mat-card-title>
            <mat-card-content>
              <span class="summary-cards__content">{{
                incomeAmount$ | async | price
              }}</span></mat-card-content
            >
          </ng-container>
          <list-content-loader *ngIf="isLoading$ | async"></list-content-loader>
        </mat-card>

        <mat-card class="color-red">
          <ng-container *ngIf="(isLoading$ | async) === false">
            <mat-card-title>Wydatki</mat-card-title>
            <mat-card-content>
              <span class="summary-cards__content">{{
                expensesAmount$ | async | price
              }}</span></mat-card-content
            >
          </ng-container>
          <list-content-loader *ngIf="isLoading$ | async"></list-content-loader>
        </mat-card>
        <mat-card
          [ngClass]="(result$ | async)! > 0 ? 'color-green' : 'color-red'"
        >
          <ng-container *ngIf="(isLoading$ | async) === false">
            <mat-card-title>Do wydania pozostało:</mat-card-title>
            <mat-card-content
              ><span class="summary-cards__content">{{
                result$ | async | price
              }}</span></mat-card-content
            >
          </ng-container>
          <list-content-loader *ngIf="isLoading$ | async"></list-content-loader>
        </mat-card>
      </div>
      <mat-divider></mat-divider>
      <div>
        <h2>Wydatki</h2>
        <ng-container *ngIf="(isLoading$ | async) === false">
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
        </ng-container>
        <app-table-content-loader
          *ngIf="isLoading$ | async"
        ></app-table-content-loader>
      </div>
      <mat-divider></mat-divider>
    </main>
  `,
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private readonly today = new Date();
  currentMonth$ = this.budgetFacade.currentMonth$;
  currentYear = this.today.getFullYear();

  expensesAmount$: Observable<number> | undefined;
  incomeAmount$: Observable<number> | undefined;
  result$: Observable<number> = of(0);
  isLoading$ = this.budgetFacade.isLoading$;

  mainCategories$: Observable<string[]> = of([]);

  constructor(
    public readonly budgetFacade: BudgetFacade,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.expensesAmount$ = this.budgetFacade.currentMonth$.pipe(
      switchMap((month) => this.budgetFacade.getExpensesAmount(month))
    );
    this.incomeAmount$ = this.budgetFacade.currentMonth$.pipe(
      switchMap((month) => this.budgetFacade.getIncomeAmount(month))
    );

    this.result$ = combineLatest([
      this.expensesAmount$,
      this.incomeAmount$,
    ]).pipe(map(([expenses, income]) => income - expenses));

    this.mainCategories$ = this.budgetFacade.currentMonth$
      .pipe(switchMap((month) => this.budgetFacade.getExpenses(month)))
      .pipe(map((expenses) => expenses.map((e) => e.mainCategory.name)));
  }

  getSummary(categoryName: string): Observable<CategoryAmountSummary[]> {
    return this.budgetFacade.currentMonth$
      .pipe(switchMap((month) => this.budgetFacade.getExpenses(month)))
      .pipe(
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

  goToNextMonth() {
    this.budgetFacade.currentMonth$.pipe(take(1)).subscribe((month) => {
      if (month !== 11) {
        this.store.dispatch(BudgetActions.showNextMonth());
      }
    });
  }
  goToPrevMonth() {
    this.budgetFacade.currentMonth$.pipe(take(1)).subscribe((month) => {
      if (month !== 0) {
        this.store.dispatch(BudgetActions.showPrevMonth());
      }
    });
  }
}
