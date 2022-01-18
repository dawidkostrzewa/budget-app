import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';

import { GoogleSheetController } from './controllers/google-sheet/google-sheet.controller';
import { AppService } from './services/app.service';
import { SheetsApiService } from './services/sheets-api/sheets-api.service';
import { TransactionController } from './controllers/transaction/transaction.controller';

@Module({
  imports: [],
  controllers: [AppController, GoogleSheetController, TransactionController],
  providers: [AppService, SheetsApiService],
})
export class AppModule {}
