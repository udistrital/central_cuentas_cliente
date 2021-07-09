import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  transform(value: any, args: string): any {

    let encontrado: boolean = false;
    const resultado: any[] = [];

    if (args === '') {
      return value;
    } else {
      for (const item of value) {
        if (JSON.stringify(item).toString().toLowerCase().indexOf(args.toLowerCase()) > -1) {
          encontrado = true;
        }
        if (encontrado) {
          resultado.push(item);
          encontrado = false;
        }
      }
      return resultado;
    }
  }
}
