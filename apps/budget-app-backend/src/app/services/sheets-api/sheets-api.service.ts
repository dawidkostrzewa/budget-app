import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import {
  AllCategoriesRages,
  MonthExpensesRages,
  SheetName,
  SheetNameMap,
  ValueRenderOption,
} from '../../models/Sheets.model';

import { Category } from '../../models/Categories.model';
const keys = require('/google-auth.json');

@Injectable()
export class SheetsApiService {
  private static SPREED_SHEET_ID = process.env.SPREAD_SHEET;

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

  async getCategories(): Promise<{
    incomeCategories: Category[];
    expenseCategories: Category[];
  }> {
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
    const sheetName = `${SheetNameMap.get(SheetName.JANUARY)}!A1:E20`;

    const {
      data: { values },
    } = await this.sheets.spreadsheets.values.get({
      spreadsheetId: SheetsApiService.SPREED_SHEET_ID,
      range: sheetName,
      valueRenderOption: ValueRenderOption.UNFORMATTED_VALUE,
    });

    const totalIncome = values![15][3] || null;
    const totalExpenses = values![16][3] || null;

    return {
      totalIncome,
      totalExpenses,
    };
  }

  async getMonthExpenses(params: { month: SheetName }) {
    const currentMonth = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(new Date());
    const month = params.month
      ? (params.month.toUpperCase() as SheetName)
      : (currentMonth.toUpperCase() as SheetName);
    const {
      data: { valueRanges },
    } = await this.sheets.spreadsheets.values.batchGet({
      spreadsheetId: SheetsApiService.SPREED_SHEET_ID,
      //TODO: get current month
      ranges: [
        `${SheetNameMap.get(month)}${MonthExpensesRages.EXPENSES}`,
        `${SheetNameMap.get(month)}!C77:D78`,
      ],
      valueRenderOption: ValueRenderOption.UNFORMATTED_VALUE,
    });

    return {
      month: SheetNameMap.get(month),
      totalPlanned: valueRanges![1].values![0]![0],
      totalReal: valueRanges![1].values![0]![1],
      expenses: this.converResponseToCategoriesWithValues(
        valueRanges![0].values!
      ),
    };
  }

  private converResponseToCategoriesWithValues(
    categories: any[][],
    itemsInCategory: number = 12
  ) {
    const allCategories = categories.map((x) => ({
      name: x[0],
      planned: x[1],
      real: x[2],
    }));

    let mainCategoriesWithSubCategories = [];
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
}
