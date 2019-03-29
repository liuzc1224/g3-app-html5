import { Component, OnInit } from '@angular/core';
import { SesssionStorageService } from "../../service/common/storage";
import { NavController } from "ionic-angular";
import { RepayQrComponent } from '../repay-qr/repay-qr' ;

@Component({
    selector: 'repay',
    templateUrl: 'repay.html'
})
export class RepayComponent implements  OnInit{
    constructor(
        private  sgo : SesssionStorageService ,
        private  nav : NavController
    ) {};

    ngOnInit(){
        this.orderInfo = this.sgo.get("orderInfo");
        this.orderDueRate = 60 ;
    };

    orderInfo : Object ;

    orderDueRate : Number ;

    goToDetail(){
        const id = this.orderInfo['id'] ;
        this.nav.push("OrderDetailPage" , {
            id : id
        })

        // this.nav.push(RepayQrComponent) ;
    };

    // transSevice(){
    //     this.nav.push("ServiceCenterPage") ;
    // };
};