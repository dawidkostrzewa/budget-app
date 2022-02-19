import { Controller, Get } from '@nestjs/common';
import { BudgetService } from '../../services/budget/budget.service';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  getYearlyBudget() {
    return this.budgetService.getYearlyBudget();
  }
}
