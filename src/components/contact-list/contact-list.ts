import { Component, OnInit } from '@angular/core';
import { NavParams , ViewController } from 'ionic-angular';
@Component({
    selector: 'contact-list',
    templateUrl: 'contact-list.html'
})
export class ContactListComponent implements OnInit{

    constructor(
        private navPara : NavParams ,
        private vireCtr : ViewController
    ){};

    list : Array<any>;

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