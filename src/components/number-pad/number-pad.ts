import { Component, Input, Output , EventEmitter } from '@angular/core';
import { SesssionStorageService } from "../../service/common/storage";
import { NavController } from "ionic-angular";
import { ForgetPaypassComponent } from "../forget-paypass/forget-paypass";

/**
 * Generated class for the NumberPadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'number-pad',
    templateUrl: 'number-pad.html'
})
export class NumberPadComponent {

    @Input() title : string = '' ;

    @Output() cancel = new EventEmitter< any > () ;

    @Input() default : string  = '' ;

    @Output() complete = new  EventEmitter< any >() ;

    private passArr : Array< number > = [] ;

    constructor(
        private sgo : SesssionStorageService ,
        private nav : NavController
    ) {} ;

    close(){

        const data = this.default ;

        this.cancel.emit({
            type : "close" ,
            data : data
        });

    };

    inputNum( num : number){
        let len = this.passArr.length ;
        if(len < 6){
            this.passArr.push(num) ;

            if(len == 5){
                this.inputComplete() ;

            }
        }else{
            this.inputComplete() ;
        };
    };

    deleteNum(){
        this.passArr.pop() ;
    };

    forget(){
        this.nav.push(ForgetPaypassComponent) ;
    };
    inputComplete(){
        let data = '' ;

        this.passArr.forEach( item => {
            data += item ;
        });

        this.complete.emit({
            type : "complete" ,
            data : data
        })
    }
};