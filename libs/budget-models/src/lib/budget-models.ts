export interface BudgetResponse {
  budget: Budget[];
}

export interface Budget {
  monthId: number;
  month: string;
  totalPlanned: number;
  totalReal: number;
  totalIncome: number;
  expenses: BudgetCategory[];
}

export interface BudgetCategory {
  mainCategory: SingleCategory;
  subCategories: SingleCategory[];
}

export interface SingleCategory {
  name: string;
  planned: number;
  real: number;
}

//TODO: create enum from month name
export const MonthNumberToNameMap = new Map<number, string>([
  [0, 'Styczeń'],
  [1, 'Luty'],
  [2, 'Marzec'],
  [3, 'Kwiecień'],
  [4, 'Maj'],
  [5, 'Czerwiec'],
  [6, 'Lipiec'],
  [7, 'Sierpień'],
  [8, 'Wrzesień'],
  [9, 'Październik'],
  [10, 'Listopad'],
  [11, 'Grudzień'],
]);
