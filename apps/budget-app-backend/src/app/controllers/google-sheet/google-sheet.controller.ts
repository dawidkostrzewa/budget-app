import { Controller, Get } from '@nestjs/common';
import { SheetsApiService } from '../../services/sheets-api/sheets-api.service';

@Controller('google-sheet')
export class GoogleSheetController {
  constructor(private readonly sheetApi: SheetsApiService) {}

  @Get('categories')
  getSheeetCategories() {
    return this.sheetApi.getCategories();
  }
}
