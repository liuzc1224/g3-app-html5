import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";

@Component({
    selector: 'list-model',
    templateUrl: 'list-model.html'
})
export class ListModelComponent {


    constructor(
        private navPara : NavParams ,
        private vireCtr : ViewController
    ){};

    list : Array< {name : string , value : any } > ;

    ngOnInit(){
        this.list = this.navPara.get('list');
    };

    back(){
        this.vireCtr.dismiss() ;
    };

    select(item : Object){
        this.vireCtr.dismiss(item);
    };
};