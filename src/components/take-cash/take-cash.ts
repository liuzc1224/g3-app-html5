import { Component, OnInit } from '@angular/core';
import { SesssionStorageService, AccountService, LoadingService, TipService } from '../../service';
import { NavController } from 'ionic-angular';
import { now } from "../../tools";
@Component({
    selector: 'take-cash',
    templateUrl: 'take-cash.html'
})
export class TakeCashComponent implements  OnInit{
    constructor(
        private sgo : SesssionStorageService ,
        private accSer : AccountService ,
        private load : LoadingService ,
        private msg : TipService ,
        private nav : NavController
    ){};

    orderInfo : Object ;

    ngOnInit(){
        this.orderInfo = this.sgo.get("orderInfo") ;
    };

    orderDueRate : Array<number> = [ 2 , 4 , 8 ] ;

    takeCash($event){
        this.nav.push("AccountConfirmPage", {
            type: 1
        }) ;
    };

    transSevice(){
        this.nav.push("ServiceCenterPage") ;
    };
};