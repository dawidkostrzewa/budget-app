import { Injectable } from '@nestjs/common';
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import { SheetName } from '../../models/Sheets.model';

const creds = require('/google-auth.json');

@Injectable()
export class SheetsApiService {
  private spredsheet: GoogleSpreadsheet = new GoogleSpreadsheet(
    '16P8_VsGbzriBsNVSHzH8lQno89F1c2F1fQwk1kZvbVM'
  );

  constructor() {
    this.spredsheet.useServiceAccountAuth(creds);
    this.spredsheet.loadInfo();
    console.log('SheetsApiService constructor');
  }

  async getCategories() {
    const sheet: GoogleSpreadsheetWorksheet =
      this.spredsheet.sheetsByTitle[SheetName.JANUARY]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);
    console.log(sheet.rowCount);
    await sheet.loadCells('A1:E20'); // loads a range of cells
    console.log(sheet.cellStats);
    console.log(sheet.getCell(15, 3).value);
    const income = sheet.getCell(15, 3).value;
    return {
      title: sheet.title,
      rowCount: sheet.rowCount,
      income,
    };
  }

  async getTotalIncomeExpenses(): Promise<{
    totalIncome: number;
    totalExpenses: number;
  }> {
    const sheet: GoogleSpreadsheetWorksheet =
      this.spredsheet.sheetsByTitle[SheetName.JANUARY]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    await sheet.loadCells('A1:E20'); // loads a range of cells
    const totalIncome = sheet.getCell(15, 3).value as number;
    const totalExpenses = sheet.getCell(16, 3).value as number;
    return {
      totalIncome,
      totalExpenses,
    };
  }
}
