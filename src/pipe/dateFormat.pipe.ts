import { Pipe, PipeTransform } from '@angular/core';
import { dataFormat } from '../tools/date'
@Pipe({
name: 'DatePipe'
})
export class DatePipe implements PipeTransform {
  transform(value: any): any {
      let val = dataFormat(value) ;
      return val ? val : "Agora sem os dados" ;
  };
};