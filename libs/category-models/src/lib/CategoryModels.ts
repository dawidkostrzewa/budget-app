export interface SingleCategory {
  name: string;
  planned: number;
  real: number;
}

export interface BudgetCategory {
  mainCategory: SingleCategory;
  subCategories: SingleCategory[];
}

export interface MonthExpesesResponse {
  month: string;
  totalPlanned: number;
  totalReal: number;
  expenses: BudgetCategory[];
  //TODO: move to proper place, when income reducred will be created
  totalIncome: number;
}
