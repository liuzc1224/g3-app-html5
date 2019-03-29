import { Pipe, PipeTransform } from '@angular/core';
import { status } from '../tools/orderStatus'
@Pipe({
name: 'OrderStatusPipe'
})
export class OrderStatusPipe implements PipeTransform {
  transform(value : number | string): any {
      return status(value) ;
  };
};