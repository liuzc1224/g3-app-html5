import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { SesssionStorageService } from "../../service";

/**
 * Generated class for the RefuseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'refuse',
    templateUrl: 'refuse.html'
})
export class RefuseComponent implements OnInit{

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams ,
        private sgo : SesssionStorageService ,
    ){}

    orderInfo : Object ;

    ngOnInit(){
        this.orderInfo = this.sgo.get("orderInfo") ;
    };

    reApply(){
        let orderInfo = this.orderInfo ;

        if(orderInfo['expireRejectDays'] > 0){
            return ;
        };

        const loanInfo = {
            money : orderInfo['applyMoney'] ,
            days : orderInfo['loanDays']
        };

        this.sgo.set("loanInfo" , loanInfo) ;

        this.navCtrl.push("LoanPurposePage") ;
    };

    transSevice(){
        this.navCtrl.push("ServiceCenterPage") ;
    };
}
