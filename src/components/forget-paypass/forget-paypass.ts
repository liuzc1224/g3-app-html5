import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { LoadingService, SesssionStorageService, TipService, AccountService, UserService, UserActionService } from "../../service";
import { Response } from "../../share/model";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { filter } from "rxjs/operators";
import { Observable } from "rxjs";
import { After, Before, CombineAll } from "../../decorators/function.decorator";
import { now } from "../../tools";
import md5 from 'js-md5';
@Component({
  selector: 'forget-paypass',
  templateUrl: 'forget-paypass.html'
})
export class ForgetPaypassComponent {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams ,
        private fb : FormBuilder ,
        private sgo : SesssionStorageService ,
        private user : UserService  ,
        private msg : TipService ,
        private translate : TranslateService ,
        private loadSer : LoadingService ,
        private accountSer : AccountService ,
        private userAction : UserActionService
    ){};

    ngOnInit(){
        this.initForm() ;
        this.getLang() ;
        this.areaCode = this.sgo.get("areaCode") ;
        this.phoneNumber = this.sgo.get("loginInfo")['phoneNumber'] ;
    };

    postCode : string = '';

    postCodeArr : Array<String> = ['' , '' , '' ,''] ;

    password : string = '' ;

    passwordAgain : string = '' ;

    areaCode : string ;

    phoneNumber : string ;

    back(){
        let obj = this.riskTime ;
        obj['nextStep'] += now() + "," ;
        this.userAction.forgetPass(obj) ;
        this.navCtrl.pop() ;
    };

    postMark : boolean = true ;

    postCodeFn($event){

        if(!this.postMark){
            return ;
        };

        const tel = this.phoneNumber ;

        const code = this.areaCode ;

        const postData = {
            areaCode : code ,
            phoneNumber : tel,
            verificationType : 3
        };

        const model = this.loadSer.deal();

        model.present() ;

        this.user.postCode(postData)
            .pipe(
                filter(
                    ( res : Response ) => {

                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };

                        $event.target.disabled = false ;

                        model.dismiss() ;

                        return res.success === true ;
                    }
                )
            )
            .subscribe(
                res => {
                    this.countDown();
                    this.msg.operateSuccess() ;
                }
            );
    };

    passInput($event){
        const el = < HTMLInputElement >$event.target ;
        const len = el.value.length ;

        this.postCodeArr = [] ;

        for(let i = 0 ; i < len ;  i++ ){
            this.postCodeArr.push(el.value.charAt(i));
        };
        this.validForm.patchValue({
            verificationCode : el.value
        });
    };

    validForm : FormGroup ;
    initForm(){
        this.validForm = this.fb.group({
            "password" : [null , [Validators.required]] ,
            "phoneNumber" : [null] ,
            "verificationCode" : [null , [Validators.required]]
        });
    };

    formPatch($event){
        const el = <HTMLInputElement>$event.target ;

        this.validForm.patchValue({
            password : el.value
        });
    };

    @Before(function () {
        return new Observable( obsr => {
            if(!this.validForm.valid){
                this.msg.require() ;
                return
            };

            if(this.password != this.passwordAgain){
                const msg = this.languagePack['tip']['notSame'] ;
                this.msg.operateWarn(msg) ;
                return ;
            };
            obsr.next("success") ;
        })
    })
    @Before(function(){
        return new Observable( obsr => {
            let obj = this.riskTime ;
            obj['nextStep'] += now() + "," ;
            this.userAction.forgetPass(obj) ;
            obsr.next("success") ;
        });
    })
    @After(function($event){
        return new Observable( obsr => {

            this.collectSer.postDeviceInfo() ;

            obsr.next("success") ;
        })
    })
    @CombineAll()
    changePass($event){
        $event.target.disabled = true ;

        const data = this.validForm.value ;

        const model = this.loadSer.deal() ;

        model.present() ;

        let postData = {} ;
        postData['area'] = data['area'] ;

        postData['areaCode'] = this.sgo.get("areaCode");

        postData['phoneNumber'] = this.phoneNumber ;

        postData['verificationCode']  = data['verificationCode'] ;

        postData['password'] = md5(data['password']) ;

        this.accountSer.changePayPass(postData)
            .pipe(
                filter(
                    (res : Response) => {
                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };

                        model.dismiss() ;

                        $event.target.disabled = false ;

                        return res.success === true ;
                    }
                )
            )
            .subscribe(
                (res : Response ) => {
                    this.navCtrl.pop() ;
                }
            )
    };

    languagePack : Object ;

    tipTitle : string ;

    getLang(){
        this.translate.stream(['tip' , 'register'])
            .subscribe(
                res => {
                    this.languagePack = res;
                    this.tipTitle = res['register']['setPass']['repost'] ;
                }
            )
    };

    countDown(){
        let count = 61 ;
        this.postMark = false ;
        Observable.interval(1000)
            .take(count)
            .map( v => ( count - 1 ) - v )
            .subscribe(
                res => {
                    this.tipTitle = res + 's' ;

                    if(res === 0 ){
                        this.tipTitle = this.languagePack['register']['setPass']['repost'] ;
                        this.postMark = true ;
                    };
                }
            )
    };

    riskTime = {
        "checkCode": "",
        "firstPassword": "",
        "getCheckCode": "",
        "nextStep": "",
        "pageType": 3,
        "secondPassword": "",
    };

    makeRecord(name : string){
        this.riskTime[name] += now() + "," ;
    };
};