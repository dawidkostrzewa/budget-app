import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('sub-categories')
  getCategories() {
    return {
      subCategories: [
        {
          id: 1,
          name: 'jedzenie dom',
          mainCategoryId: 1,
        },
        {
          id: 2,
          name: 'jedzenie miasto',
          mainCategoryId: 1,
        },
        {
          id: 3,
          name: 'alkohol',
          mainCategoryId: 1,
        },
        {
          id: 4,
          name: 'czynsz',
          mainCategoryId: 2,
        },
        {
          id: 5,
          name: 'rachunki',
          mainCategoryId: 2,
        },
        {
          id: 6,
          name: 'środki czystości',
          mainCategoryId: 2,
        },
        {
          id: 7,
          name: 'paliwo',
          mainCategoryId: 3,
        },
        {
          id: 8,
          name: 'mpk',
          mainCategoryId: 3,
        },
        {
          id: 9,
          name: 'telefon',
          mainCategoryId: 4,
        },
        {
          id: 10,
          name: 'internet',
          mainCategoryId: 4,
        },
        {
          id: 11,
          name: 'sport',
          mainCategoryId: 5,
        },
        {
          id: 12,
          name: 'hobby',
          mainCategoryId: 5,
        },
        {
          id: 13,
          name: 'książki',
          mainCategoryId: 5,
        },
      ],
    };
  }

  @Get('transactions')
  getTransactions() {
    return {
      transactions: [
        { id: 1, amount: 178, categoryId: 2, date: '2021-10-01' },
        { id: 2, amount: 117, categoryId: 1, date: '2021-10-05' },
        { id: 3, amount: 100, categoryId: 3, date: '2021-10-09' },
        { id: 4, amount: 151, categoryId: 5, date: '2021-10-09' },
        { id: 5, amount: 123, categoryId: 12, date: '2021-10-23' },
        { id: 6, amount: 300, categoryId: 3, date: '2021-10-24' },
        { id: 7, amount: 500, categoryId: 10, date: '2021-10-28' },
        { id: 8, amount: 123, categoryId: 11, date: '2021-10-23' },
      ],
    };
  }
}
