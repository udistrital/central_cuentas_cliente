import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTable'
})
export class CustomTablePipe implements PipeTransform {

  transform(value: any, args: any): any {
    return args(value);
  }

}
