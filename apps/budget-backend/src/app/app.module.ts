import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';

import { AppService } from './services/app.service';
import { SheetsApiService } from './services/sheets-api/sheets-api.service';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { BudgetController } from './controllers/budget/budget.controller';
import { BudgetService } from './services/budget/budget.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    AppController,
    TransactionController,
    CategoriesController,
    BudgetController,
  ],
  providers: [AppService, SheetsApiService, BudgetService],
})
export class AppModule {}
