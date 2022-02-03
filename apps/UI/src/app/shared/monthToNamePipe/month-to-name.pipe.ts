import { Pipe, PipeTransform } from '@angular/core';
import { MonthNumberToNameMap } from '@budgetapp/budget-models';

@Pipe({
  name: 'monthToName',
})
export class MonthToNamePipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value !== null && value !== undefined) {
      return MonthNumberToNameMap.get(value)!;
    }
    return '';
  }
}
