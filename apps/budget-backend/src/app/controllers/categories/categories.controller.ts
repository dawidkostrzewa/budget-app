import { Controller, Get } from '@nestjs/common';
import { SheetsApiService } from '../../services/sheets-api/sheets-api.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly sheetsApiService: SheetsApiService) {}

  @Get()
  getCategories() {
    return this.sheetsApiService.getCategories();
  }
}
