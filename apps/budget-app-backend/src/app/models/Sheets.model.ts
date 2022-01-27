export enum SheetName {
  CATEGORIES = 'Wzorzec kategorii',
  ACCOUTNS = 'STAN KONT',
  ALL_YEAR = 'CAŁY ROK',
  JANUARY = 'Styczeń',
  FEBRUARY = 'Luty',
  MARCH = 'Marzec',
  APRIL = 'Kwiecień',
  MAY = 'Maj',
  JUNE = 'Czerwiec',
  JULY = 'Lipiec',
  AUGUST = 'Sierpień',
  SEPTEMBER = 'Wrzesień',
  OCTOBER = 'Październik',
  NOVEMBER = 'Listopad',
  DECEMBER = 'Grudzień',
}

export enum ValueRenderOption {
  UNFORMATTED_VALUE = 'UNFORMATTED_VALUE',
  FORMATTED_VALUE = 'FORMATTED_VALUE',
  FORMULA = 'FORMULA',
}

export const AllCategoriesRages = {
  INCOME: `${SheetName.CATEGORIES}!B14:C29`,
  EXPENSES: `${SheetName.CATEGORIES}!B35:C213`,
};

export const MonthExpensesRages = {
  EXPENSES: `${SheetName.CATEGORIES}!B79:E257`,
};
