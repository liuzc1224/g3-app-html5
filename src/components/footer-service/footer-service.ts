import { Component } from '@angular/core';
import { NavController } from "ionic-angular";

/**
 * Generated class for the FooterServiceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'footer-service',
    templateUrl: 'footer-service.html'
})
export class FooterServiceComponent {

    constructor(
        private navCtrl : NavController
    ) {}

    transSevice(){
        this.navCtrl.push("ServiceCenterPage") ;
    };
}
