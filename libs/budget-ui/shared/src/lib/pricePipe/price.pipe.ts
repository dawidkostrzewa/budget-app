import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(value: undefined | null | string | number): string {
    if (value) {
      if (typeof value === 'string') {
        return (
          parseFloat(value)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$& ') + ' PLN'
        );
      }
      if (typeof value === 'number') {
        return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ') + ' PLN';
      }
    }
    return '0.00 PLN';
  }
}
