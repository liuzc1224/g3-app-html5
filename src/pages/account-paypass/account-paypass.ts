import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService, TipService, LoadingService } from '../../service' ;
import { filter } from 'rxjs/operators' ;
import { Response } from '../../share/model' ;
import md5 from 'js-md5';
@IonicPage({
    name : "AccountPayPassPage"
})
@Component({
    selector: 'page-account-paypass',
    templateUrl: 'account-paypass.html',
})
export class AccountPaypassPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams ,
        private accountSer : AccountService ,
        private msg : TipService ,
        private loadSer : LoadingService ,
    ){};

    passChange($event){

        if(!this.password){
            this.passwordArr =[] ;
            return ;
        };

        const el = this.password.toString() ;

        if(el.length>6){
            this.password = el.slice(0,6) ;
        };
        const len = el.length ;

        this.passwordArr = [] ;

        for(let i = 0 ; i < len ;  i++ ){
            this.passwordArr.push(el.charAt(i));
        };
    };

    password : string ;

    passwordArr : Array<string> = ['' , '' , '' ,'' ,'' ,''] ;

    setPayPass(){

        if(this.password.toString().length < 6){
            this.msg.require() ;
            return ;
        };

        let pass = md5(this.password.toString()) ;

        if(!pass){
            this.msg.require() ;
            return ;
        };

        const model = this.loadSer.deal() ;

        model.present() ;

        this.accountSer.set({
            payPassword : pass
        })
            .pipe(
                filter(
                    (res : Response) => {
                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };

                        model.dismiss() ;

                        return res.success === true
                    }
                )
            )
            .subscribe(
                (res : Response) => {
                    // this.navCtrl.push("AccountConfirmPage")
                    this.navCtrl.pop();
                }
            );
    };

    back(){
        this.navCtrl.pop() ;
    };
};