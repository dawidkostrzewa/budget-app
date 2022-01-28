import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(value: undefined | null | string | number): string {
    if (value) {
      if (typeof value === 'string') {
        return parseFloat(value).toFixed(2);
      }
      if (typeof value === 'number') {
        return value.toFixed(2);
      }
    }
    return '0';
  }
}
