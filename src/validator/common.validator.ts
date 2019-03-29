import { FormControl } from '@angular/forms' ;
import { RegGroup } from './regGroup/reg'
export const CommonValidator = {
    isCpfValid(control : FormControl){
        let val = control.value;
        let valid = RegGroup.cpfValid(val) ;
        return valid ? null :  { "invalid" : true } ;
    },
    isMail(control : FormControl){
        let val = control.value ;
        let valid = RegGroup.mailValid(val) ;
        return valid ? null :  { "invalid" : true } ;
    } ,
    passValid(control : FormControl){
        let val = control.value ;
        let valid = RegGroup.passValid(val) ;
        return valid ? null : { "invalid" : true } ;
    } ,
    isIdValid(control : FormControl){
        let val = control.value ;
        let valid = RegGroup.idValid(val) ;
        return valid ? null : { "invalid" : true } ;
    },
    isNumber( control : FormControl ){
        let val = control.value ;
        let valid = RegGroup.isNumber(val) ;
        return valid ? null : { "invalid" : true } ;
    } ,
};