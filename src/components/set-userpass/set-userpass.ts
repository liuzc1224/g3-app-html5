import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'
import { FormGroup , Validators , FormBuilder } from '@angular/forms';
import { UserService } from '../../service/user'
import { LoadingService, SesssionStorageService, TipService, UserActionService } from '../../service';
import { filter } from 'rxjs/operators' ;
import { Response } from '../../share/model' ;
import { ForgetUsrpassComponent } from '../forget-usrpass/forget-usrpass';
import { CommonValidator } from "../../validator";
import { After, Before, CombineAll } from "../../decorators/function.decorator";
import { Observable } from "../../../node_modules/rxjs";
import { now } from "../../tools";
import bridge from '../../tools/bridge';
import md5 from 'js-md5';

@Component({
    selector: 'set-userpass',
    templateUrl: 'set-userpass.html'
})
export class SetUserpassComponent {
    constructor(
        private nav : NavController ,
        private fb : FormBuilder ,
        private userSer : UserService ,
        private msg : TipService ,
        private sgo : SesssionStorageService,
        private loadCtrl : LoadingService ,
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
            "oldPassword" : [ null , [Validators.required , CommonValidator.passValid]] ,
            "password" : [ null , [Validators.required , CommonValidator.passValid ]] ,
            "passwordAgain" : [ null , [Validators.required , CommonValidator.passValid ] ]
        })
    };

    @Before(function () {
        return new Observable( obsr => {
            if(!this.validForm.valid){
                this.msg.require() ;

                return ;
            };

            if(this.validForm.value['password'] != this.validForm.value['passwordAgain']){
                this.msg.notSame() ;
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
    @After(function($event){
        return new Observable( obsr => {

            this.collectSer.postDeviceInfo() ;
            obsr.next("success") ;
        })
    })
    @CombineAll()
    changePass($event){
        let formValue = this.validForm.value ;

        let data = {} ;

        data['password'] = md5(formValue['password']);

        data['oldPassword'] = md5(formValue['oldPassword']);

        let model = this.loadCtrl.deal();

        model.present() ;

        this.userSer.changePass(data)
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
        // this.nav.push(ForgetUsrpassComponent) ;
        bridge['forgetLoginPw']();
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
}
