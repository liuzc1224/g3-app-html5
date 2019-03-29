import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../service/user'
import { LoadingService, SesssionStorageService, TipService, UserActionService } from '../../service';
import { filter } from 'rxjs/operators';
import { Response } from '../../share/model';
import { ForgetPaypassComponent } from "../forget-paypass/forget-paypass";
import { CommonValidator } from '../../validator/common.validator' ;
import { After, Before, CombineAll } from "../../decorators/function.decorator";
import { Observable } from "../../../node_modules/rxjs";
import { now } from "../../tools";
import bridge from '../../tools/bridge';
import md5 from 'js-md5';
@Component({
    selector: 'set-paypass',
    templateUrl: 'set-paypass.html'
})
export class SetPaypassComponent implements OnInit{
    constructor(
        private nav : NavController ,
        private fb : FormBuilder ,
        private msg : TipService ,
        private accountSer : AccountService ,
        private sgo : SesssionStorageService ,
        private loadCtr : LoadingService ,
        private userAction : UserActionService
    ){} ;

    ngOnInit(){
        this.initForm() ;
    };

    back(){
        let obj = this.riskTime ;
        obj['nextStep'] = now() + "," ;
        this.userAction.changePass(obj) ;
        // bridge['goBack']();
        this.nav.pop() ;
    };

    validForm : FormGroup;

    initForm(){
        this.validForm = this.fb.group({
            "oldPassword" : [ null , [Validators.required , CommonValidator.isNumber]] ,
            "password" : [ null , [Validators.required , CommonValidator.isNumber]] ,
            "passwordAgain" : [ null , [Validators.required , CommonValidator.isNumber]]
        })
    };

    @Before(function(){
        return new Observable( obsr => {
            if(!this.validForm.valid){
                this.msg.require() ;
                return ;
            };

            if(this.validForm.value.password != this.validForm.value.passwordAgain){
                this.msg.notSame();
                return ;
            };

            obsr.next("success") ;
        })
    })
    @Before(function () {
        return new Observable( obsr => {
            let obj = this.riskTime ;
            obj['nextStep'] = now() + "," ;
            this.userAction.changePass(obj) ;
            obsr.next("success") ;
        })
    })
    @CombineAll()
    changePass($event){

        let formVal = this.validForm.value ;

        let data = {} ;

        let model = this.loadCtr.deal();

        model.present() ;

        data['password'] = md5(formVal['password']) ;

        data['oldPassword'] = md5(formVal['oldPassword']) ;

        this.accountSer.changePass(data)
            .pipe(
                filter(
                    (res : Response) => {

                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };

                        model.dismiss() ;

                        return res.success === true ;
                    }
                )
            )
            .subscribe(
                ( res : Response ) => {
                    this.msg.operateSuccess() ;
                }
            );
    };

    forget(){
        let tel = this.sgo.get("loginInfo")['phoneNumber'];
        this.sgo.set("phoneNumber" , tel) ;
        this.nav.push(ForgetPaypassComponent) ;
    };

    riskTime = {
        "firstPassword": "",
        "nextStep": "",
        "oldPassword": "",
        "pageType": 1,
        "secondPassword": "",
    };

    makeRecord( name : string){
        this.riskTime[name] += now() + "," ;
    };
};