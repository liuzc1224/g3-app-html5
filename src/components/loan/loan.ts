import { Component, OnInit } from '@angular/core';
import { NavController } from "ionic-angular";
import { SesssionStorageService } from "../../service/common/storage";

@Component({
    selector: 'loan',
    templateUrl: 'loan.html'
})
export class LoanComponent implements OnInit{

    text: string;

    constructor(
        private  nav : NavController ,
        private sgo : SesssionStorageService
    ){};

    ngOnInit(){
        this.orderInfo = this.sgo.get("orderInfo");
    };

    orderInfo : Object ;

    toService(){
        this.nav.push("ServiceCenterPage") ;
    };

    goToDetail(){
        const id = this.orderInfo['id'] ;
        this.nav.push("OrderDetailPage" , {
            id : id
        })

        // this.nav.push(RepayQrComponent) ;
    };

    transSevice(){
        this.nav.push("ServiceCenterPage") ;
    };
};