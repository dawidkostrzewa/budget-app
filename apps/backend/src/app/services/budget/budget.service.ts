import { Injectable } from '@nestjs/common';
import { SheetsApiService } from '../sheets-api/sheets-api.service';

@Injectable()
export class BudgetService {
  constructor(private readonly sheetApiService: SheetsApiService) {}

  async getYearlyBudget() {
    const budget = await this.sheetApiService.getAllInformation();
    return budget;
  }
}
