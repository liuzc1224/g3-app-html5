import { Pipe, PipeTransform } from '@angular/core';
import { status } from '../tools/orderStatus'
@Pipe({
    name: 'AbsPipe'
})
export class AbsPipe implements PipeTransform {
    transform(value : any ): any {
        if(value){
            return Math.abs(value) ;
        }else{
            return value ;
        }
    };
};