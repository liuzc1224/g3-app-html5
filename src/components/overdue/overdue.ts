import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RepayQrComponent } from '../repay-qr/repay-qr'
import { SesssionStorageService } from "../../service/common/storage";
/**
 * Generated class for the OverdueComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'overdue',
    templateUrl: 'overdue.html'
})
export class OverdueComponent implements  OnInit{
    constructor(
        private nav : NavController ,
        private sgo : SesssionStorageService
    ){};

    orderInfo : Object ;
    ngOnInit(){
        this.orderInfo = this.sgo.get("orderInfo") ;
    };

    goToDetail(){
        let id = this.orderInfo['id'] ;
        this.nav.push("OrderDetailPage" , {
            id : id
        });
    };
};