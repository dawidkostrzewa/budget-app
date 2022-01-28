import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CategoryAmountSummary } from '../Category/category.model';
import { Transaction, TransactionWithCategoryName } from './transaction.model';
import { TransactionsFacade } from './transactions.facade';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private readonly transactionFacade: TransactionsFacade) {}

  getTransactionsAmountByCategory(catId: number) {
    return this.transactionFacade
      .getTransactionsAmountByCategory(catId)
      .pipe(
        switchMap((amount) =>
          this.transactionFacade
            .getCategoryById(catId)
            .pipe(map((category) => ({ amount, category })))
        )
      );
  }

  //   getTransactionsAmountSummaryByMainCategory(
  //     mainCategoryId: number
  //   ): Observable<CategoryAmountSummary[]> {
  //     return this.transactionFacade
  //       .getCategoriesByMainCategory(mainCategoryId)
  //       .pipe(
  //         switchMap((categories) =>
  //           combineLatest(
  //             categories.map((cat) =>
  //               this.getTransactionsAmountByCategory(cat.id)
  //             )
  //           )
  //         )
  //       );
  //   }

  getTransactionsWithCategories(): Observable<TransactionWithCategoryName[]> {
    return combineLatest([
      this.transactionFacade.transactions$,
      this.transactionFacade.categories$,
      this.transactionFacade.mainCategories$,
    ]).pipe(
      map(([transactions, categories, mainCategories]) =>
        transactions.map((t: Transaction) => ({
          id: t.id,
          amount: t.amount,
          date: new Date(t.date).getMonth(),
          categoryName:
            categories.find((c) => c.id === t.categoryId)?.name || 'Not found',
          mainCategoryName:
            mainCategories.find(
              (mC) =>
                mC.id ===
                categories.find((c) => c.id === t.categoryId)?.mainCategoryId
            )?.name || 'Not found',
        }))
      )
    );
  }

  getAllTransactionsByMainCategoryName(mainCategoryName: string) {
    return this.getTransactionsWithCategories().pipe(
      map((transactions) =>
        transactions.filter(
          (t: TransactionWithCategoryName) =>
            t.mainCategoryName === mainCategoryName
        )
      )
    );
  }
}
