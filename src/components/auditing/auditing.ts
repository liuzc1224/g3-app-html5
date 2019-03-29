import { Component, OnInit } from '@angular/core';
import { NavController } from "ionic-angular";
import { UserActionService } from "../../service/risk";
import { now } from "../../tools";
/**
 * Generated class for the AuditingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'auditing',
  templateUrl: 'auditing.html'
})
export class AuditingComponent implements  OnInit{
    constructor(
        private navCtrl : NavController ,
        private userAction : UserActionService
    ) {}

    transSevice(){
        this.navCtrl.push("ServiceCenterPage") ;
    };

    ngOnInit(){
        this.userAction.audit({
            "skipWaitAudit" : now()
        });
    };
}
