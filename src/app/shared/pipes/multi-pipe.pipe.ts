import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { CustomTablePipe } from './custom-table.pipe';

@Pipe({
  name: 'multiPipe'
})
export class MultiPipePipe implements PipeTransform {

  constructor(
    private date: DatePipe,
    private currency: CurrencyPipe,
    private decimal: DecimalPipe,
    private percent: PercentPipe,
    private custom: CustomTablePipe
  ) {
  }
  transform(value: any, type: any, args?: any[]): any {

    switch (type) {
      case 'date':
        return this.date.transform(value, ...args);
      case 'currency':
        return this.currency.transform(value, ...args);
      case 'decimal':
        return this.decimal.transform(value, ...args);
      case 'percent':
        return this.percent.transform(value, ...args);
      case 'custom':
        return this.custom.transform(value, args[0]);
      default:
        return value;
    }
  }

}
