import { Component } from '@angular/core';
import { SesssionStorageService } from "../../service/common/storage";
import { NavController } from "ionic-angular";

@Component({
  selector: 'rest',
  templateUrl: 'rest.html'
})
export class RestComponent {
    constructor(
        private  sgo : SesssionStorageService ,
        private  nav : NavController
    ){}
    ngOnInit(){
        this.orderInfo = this.sgo.get("orderInfo");

        let overDue = {
            "7" : 2 ,
            "14" : 4 ,
            "28" : 8
        };

        // this.orderDueRate = overDue[this.orderInfo['loanDays']]
        this.orderDueRate = 60 ;
    };

    orderInfo : Object ;
    orderDueRate : Number ;

    goToDetail(){
        let id = this.orderInfo['id'] ;
        this.nav.push("OrderDetailPage" , {
            id : id
        });
    };
}
