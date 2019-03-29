import { Pipe, PipeTransform } from '@angular/core';
import { dataFormat } from '../tools/date'
@Pipe({
name: 'PercentPipe'
})
export class PercentPipe implements PipeTransform {
  transform(value: any): any {
      return (value * 100 ).toFixed(2).replace("." , ",") ;
  };
};