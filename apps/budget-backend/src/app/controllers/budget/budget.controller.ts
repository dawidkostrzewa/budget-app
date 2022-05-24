import { Controller, Get, Param, Query } from '@nestjs/common';
import { BudgetService } from '../../services/budget/budget.service';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  getCurrentYearlyBudget() {
    return this.budgetService.getYearlyBudget({
      year: new Date().getFullYear().toString(),
    });
  }

  @Get(':year')
  getYearlyBudget(@Param() year: { year: string }) {
    return this.budgetService.getYearlyBudget(year);
  }
}
