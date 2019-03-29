import { Pipe, PipeTransform } from '@angular/core';
import { money } from '../tools/index'
@Pipe({
name: 'MoneyFormatPipe'
})
export class MoneyFormatPipe implements PipeTransform {

  transform(value: any): any {
      return money(value) ;
  };
};