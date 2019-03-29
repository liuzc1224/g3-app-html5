import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
    selector: 'loan-fail',
    templateUrl: 'loan-fail.html'
})
export class LoanFailComponent {
    constructor(
        private  nav : NavController
    ){};

    takeCash($event) {
        this.nav.push("AccountConfirmPage");
    };
}
