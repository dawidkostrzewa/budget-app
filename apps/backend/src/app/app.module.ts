import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';

import { AppService } from './services/app.service';
import { SheetsApiService } from './services/sheets-api/sheets-api.service';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { CategoriesController } from './controllers/categories/categories.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, TransactionController, CategoriesController],
  providers: [AppService, SheetsApiService],
})
export class AppModule {}
