import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaSeparator'
})
export class CommaSeparatorPipe implements PipeTransform {

  transform(value: number | string): string {
    let num = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(num)) {
      return '';
    }
    return num.toLocaleString('en-US');
  }

}
