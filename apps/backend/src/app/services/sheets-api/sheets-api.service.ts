import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import {
  AllCategoriesRages,
  MonthExpensesRages,
  SheetName,
  SheetNameMap,
  ValueRenderOption,
} from '../../models/Sheets.model';

import { Budget, BudgetCategory } from '@budgetapp/budget-models';
const keys = require('/google-auth.json');

@Injectable()
export class SheetsApiService {
  private static SPREED_SHEET_ID = process.env.SPREAD_SHEET;

  private cachedAllExpenses: Budget[] = [];

  private googleAuthClient = new google.auth.JWT(
    keys.client_email,
    undefined,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  private sheets = google.sheets({
    version: 'v4',
    auth: this.googleAuthClient,
  });

  constructor() {
    console.log('SheetsApiService constructor');
  }

  async getCategories() {
    const batchGet = await this.sheets.spreadsheets.values.batchGet({
      spreadsheetId: SheetsApiService.SPREED_SHEET_ID,
      ranges: [AllCategoriesRages.INCOME, AllCategoriesRages.EXPENSES],
      valueRenderOption: ValueRenderOption.FORMATTED_VALUE,
    });

    const incomeCategories = this.convertResponseToCategoriesWithSubCategories(
      batchGet.data.valueRanges![0]?.values!,
      16
    );

    const expenseCategories = this.convertResponseToCategoriesWithSubCategories(
      batchGet.data.valueRanges![1]?.values!,
      12
    );

    return {
      incomeCategories,
      expenseCategories,
    };
  }

  async getTotalIncomeExpenses(): Promise<{
    totalIncome: number;
    totalExpenses: number;
  }> {
    //TODO: paramiterize by month
    const currentMonth = this.getCurrentMonth().toUpperCase() as SheetName;
    const sheetName = `${SheetNameMap.get(currentMonth)}!D16:D17`;
    const {
      data: { values },
    } = await this.sheets.spreadsheets.values.get({
      spreadsheetId: SheetsApiService.SPREED_SHEET_ID,
      range: sheetName,
      valueRenderOption: ValueRenderOption.UNFORMATTED_VALUE,
    });

    const totalIncome = values![0][0] || null;
    const totalExpenses = values![1][0] || null;

    return {
      totalIncome,
      totalExpenses,
    };
  }

  //TODO: wrong month error handling
  async getMonthExpenses(params: { month: SheetName }) {
    const currentMonth = this.getCurrentMonth();
    const month = params.month
      ? (params.month.toUpperCase() as SheetName)
      : (currentMonth.toUpperCase() as SheetName);
    const {
      data: { valueRanges },
    } = await this.sheets.spreadsheets.values.batchGet({
      spreadsheetId: SheetsApiService.SPREED_SHEET_ID,
      ranges: [
        `${SheetNameMap.get(month)}${MonthExpensesRages.EXPENSES}`,
        `${SheetNameMap.get(month)}!C77:D78`,
        `${SheetNameMap.get(month)}!D16:D17`,
      ],
      valueRenderOption: ValueRenderOption.UNFORMATTED_VALUE,
    });

    return {
      month: SheetNameMap.get(month)!,
      totalPlanned: valueRanges![1].values![0]![0].toFixed(2),
      totalReal: valueRanges![2].values![1]![0].toFixed(2),
      totalIncome: valueRanges![2].values![0]![0].toFixed(2),
      expenses: this.converResponseToCategoriesWithValues(
        valueRanges![0].values!
      ),
    };
  }

  async getAllInformation() {
    if (this.cachedAllExpenses.length) {
      console.log('CACHED');
      return {
        budget: this.cachedAllExpenses,
      };
    }
    const ranges = [];
    for (let sheet in SheetName) {
      if (
        sheet !== SheetName.ACCOUTNS &&
        sheet !== SheetName.ALL_YEAR &&
        sheet !== SheetName.CATEGORIES
      ) {
        ranges.push(
          `${SheetNameMap.get(sheet as SheetName)}${
            MonthExpensesRages.EXPENSES
          }`,
          `${SheetNameMap.get(sheet as SheetName)}!C77:D78`,
          `${SheetNameMap.get(sheet as SheetName)}!D16:D17`
        );
      }
    }

    const {
      data: { valueRanges },
    } = await this.sheets.spreadsheets.values.batchGet({
      spreadsheetId: SheetsApiService.SPREED_SHEET_ID,
      ranges: ranges,
      valueRenderOption: ValueRenderOption.UNFORMATTED_VALUE,
    });
    const allExpenses = [];
    for (let i = 0; i < valueRanges!.length; i += 3) {
      allExpenses.push({
        //i.e. "Styczen!A1:B2"
        month: valueRanges![i]!.range!.split('!')[0].replace(/'/g, ''),
        totalPlanned: valueRanges![i + 1].values![0]![0].toFixed(2),
        totalReal: valueRanges![i + 2].values![1]![0].toFixed(2),
        totalIncome: valueRanges![i + 2].values![0]![0].toFixed(2),
        expenses: this.converResponseToCategoriesWithValues(
          valueRanges![i].values!
        ),
      });
    }
    this.cachedAllExpenses = allExpenses;
    return {
      budget: allExpenses,
    };
  }

  private converResponseToCategoriesWithValues(
    categories: any[][],
    itemsInCategory: number = 12
  ): BudgetCategory[] {
    const allCategories = categories.map((x) => ({
      name: x[0],
      planned: x[1],
      real: x[2],
    }));

    const mainCategoriesWithSubCategories: BudgetCategory[] = [];
    for (let i = 0; i < allCategories.length; i += itemsInCategory) {
      const all = allCategories.slice(i, i + itemsInCategory);
      const mainCategory = all[0];
      const subCategories = all
        .slice(1)
        .filter(
          ({ name }) => !!name && name !== '-' && name !== ' ' && name !== '.'
        );
      mainCategoriesWithSubCategories.push({
        mainCategory,
        subCategories,
      });
    }
    return mainCategoriesWithSubCategories;
  }

  private convertResponseToCategoriesWithSubCategories(
    categories: string[][],
    itemsInCategory: number
  ) {
    const allCategories = categories.map((x) => x[0]);
    let mainCategoriesWithSubCategories = [];
    for (let i = 0; i < allCategories.length; i += itemsInCategory) {
      const all = allCategories.slice(i, i + itemsInCategory);
      const mainCategory = all[0];
      const subCategories = all
        .slice(1)
        .filter((x) => !!x && x !== '-' && x !== ' ' && x !== '.');
      mainCategoriesWithSubCategories.push({
        mainCategory,
        subCategories,
      });
    }
    return mainCategoriesWithSubCategories;
  }

  private getCurrentMonth() {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(new Date());
  }
}
