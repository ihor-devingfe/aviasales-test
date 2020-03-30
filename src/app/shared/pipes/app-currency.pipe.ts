import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appCurrency'
})
export class AppCurrencyPipe implements PipeTransform {
  transform(price: number): string {
    const arr = price.toString(10).split('');

    if (arr.length > 4) {
      arr.splice(-3, 0, ' ');
    }

    return arr.join('') + ' P';
  }
}
