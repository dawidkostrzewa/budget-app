export enum SheetName {
  CATEGORIES = 'CATEGORIES',
  ACCOUTNS = 'ACCOUTNS',
  ALL_YEAR = 'ALL_YEAR',
  JANUARY = 'JANUARY',
  FEBRUARY = 'FEBRUARY',
  MARCH = 'MARCH',
  APRIL = 'APRIL',
  MAY = 'MAY',
  JUNE = 'JUNE',
  JULY = 'JULY',
  AUGUST = 'AUGUST',
  SEPTEMBER = 'SEPTEMBER',
  OCTOBER = 'OCTOBER',
  NOVEMBER = 'NOVEMBER',
  DECEMBER = 'DECEMBER',
}

export const SheetNameMap = new Map<SheetName, string>([
  [SheetName.CATEGORIES, 'Wzorzec kategorii'],
  [SheetName.ACCOUTNS, 'STAN KONT'],
  [SheetName.ALL_YEAR, 'CAŁY ROK'],
  [SheetName.JANUARY, 'Styczeń'],
  [SheetName.FEBRUARY, 'Luty'],
  [SheetName.MARCH, 'Marzec'],
  [SheetName.APRIL, 'Kwiecień'],
  [SheetName.MAY, 'Maj'],
  [SheetName.JUNE, 'Czerwiec'],
  [SheetName.JULY, 'Lipiec'],
  [SheetName.AUGUST, 'Sierpień'],
  [SheetName.SEPTEMBER, 'Wrzesień'],
  [SheetName.OCTOBER, 'Październik'],
  [SheetName.NOVEMBER, 'Listopad'],
  [SheetName.DECEMBER, 'Grudzień'],
]);

export enum ValueRenderOption {
  UNFORMATTED_VALUE = 'UNFORMATTED_VALUE',
  FORMATTED_VALUE = 'FORMATTED_VALUE',
  FORMULA = 'FORMULA',
}

export const AllCategoriesRages = {
  INCOME: `${SheetNameMap.get(SheetName.CATEGORIES)}!B14:C29`,
  EXPENSES: `${SheetNameMap.get(SheetName.CATEGORIES)}!B35:C213`,
};

export const MonthExpensesRages = {
  EXPENSES: `!B79:E257`,
};
