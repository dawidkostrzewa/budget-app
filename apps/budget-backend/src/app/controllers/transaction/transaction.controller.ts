import { Controller, Get, Query } from '@nestjs/common';
import { SheetName } from '../../models/Sheets.model';
import { SheetsApiService } from '../../services/sheets-api/sheets-api.service';

@Controller('transaction')
export class TransactionController {
  constructor(private sheetService: SheetsApiService) {}

  @Get('total-income-expenses')
  getTotalIncome(): Promise<{
    totalIncome: number;
    totalExpenses: number;
  }> {
    return this.sheetService.getTotalIncomeExpenses();
  }

  @Get('expenses')
  getCurrentMonthExpenses(@Query() param: { month: SheetName }) {
    return this.sheetService.getMonthExpenses(param);
  }

  @Get('expenses/all')
  getAllExpenses() {
    return this.sheetService.getAllInformation();
  }
}
