import { Injectable } from '@nestjs/common';
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import {
  CategoriesRages,
  SheetName,
  ValueRenderOption,
} from '../../models/Sheets.model';

import { google } from 'googleapis';
const keys = require('/google-auth.json');

@Injectable()
export class SheetsApiService {
  private spredsheet: GoogleSpreadsheet = new GoogleSpreadsheet(
    '16P8_VsGbzriBsNVSHzH8lQno89F1c2F1fQwk1kZvbVM'
  );

  private spredsheetId = '16P8_VsGbzriBsNVSHzH8lQno89F1c2F1fQwk1kZvbVM';

  private googleAuthClient = new google.auth.JWT(
    keys.client_email,
    undefined,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  constructor() {
    console.log('SheetsApiService constructor');
  }

  async getCategories() {
    const sheetName = `${SheetName.CATEGORIES}!B14:C213`;
    const sheets = google.sheets({
      version: 'v4',
      auth: this.googleAuthClient,
    });
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spredsheetId,
      range: sheetName,
      valueRenderOption: ValueRenderOption.FORMATTED_VALUE,
    });

    const batchGet = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: this.spredsheetId,
      ranges: [CategoriesRages.INCOME, CategoriesRages.EXPENSES],
      valueRenderOption: ValueRenderOption.FORMATTED_VALUE,
    });
    return {
      incomeCategories: batchGet.data.valueRanges![0]?.values,
      expenseCategories: batchGet.data.valueRanges![1]?.values,
    };
  }

  async getTotalIncomeExpenses(): Promise<{
    totalIncome: number;
    totalExpenses: number;
  }> {
    const sheetName = `${SheetName.JANUARY}!A1:E20`;
    const sheets = google.sheets({
      version: 'v4',
      auth: this.googleAuthClient,
    });
    const {
      data: { values },
    } = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spredsheetId,
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
}
