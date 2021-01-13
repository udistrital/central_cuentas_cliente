import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoOrdenVigencia'
})
export class TipoOrdenVigenciaPipe implements PipeTransform {

  transform(value: any, actual: number): string {
    if (value && value.valor && actual) {
      if (value.valor === actual) {
        return 'Vigencia Actual';
      } else if (value.valor === actual - 1) {
        return 'Reversa';
      } else if (value.valor < actual - 1) {
        return 'Pasivo Exigible';
      }
    }
    return null;
  }

}
