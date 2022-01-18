import { Controller, Get } from '@nestjs/common';
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
}
