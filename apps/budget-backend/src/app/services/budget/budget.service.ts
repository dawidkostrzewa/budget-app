import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { SheetsApiService } from '../sheets-api/sheets-api.service';

@Injectable()
export class BudgetService {
  constructor(private readonly sheetApiService: SheetsApiService) {}

  async getYearlyBudget(year: { year: string }) {
    const budget = await this.sheetApiService.getFullYearInformation(year);

    const db = getFirestore();

    budget.budget.forEach(async (category) => {
      const categoryRef = db.collection(year.year).doc(category.month);
      await categoryRef.set(category);
    });

    return budget;
  }
}
