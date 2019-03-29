import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { LoadingService, SesssionStorageService, TipService, UserService, UserActionService } from "../../service";
import { Response } from "../../share/model";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HomePage } from "../../pages/home/home";
import { filter } from "rxjs/operators";
import { Observable } from "../../../node_modules/rxjs";
import { After, Before, CombineAll } from "../../decorators/function.decorator";
import { now } from "../../tools";
import md5 from 'js-md5';
@Component({
    selector: 'forget-usrpass',
    templateUrl: 'forget-usrpass.html'
})
export class ForgetUsrpassComponent {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams ,
        private fb : FormBuilder ,
        private sgo : SesssionStorageService ,
        private user : UserService ,
        private msg : TipService ,
        private translate : TranslateService ,
        private loadSer : LoadingService ,
        private events : Events ,
        private userAction : UserActionService
    ){};

    ngOnInit(){
        this.initForm() ;
        this.getLang() ;
        this.areaCode = this.sgo.get("areaCode") ;
        this.phone = this.sgo.get("phoneNumber") ;
    };

    postCode : string = '';

    postCodeArr : Array<String> = ['' , '' , '' ,''] ;

    password : string = '' ;

    passwordAgain : string = '' ;

    areaCode : string = '' ;

    phone : string = '' ;

    back(){
        let obj = this.riskTime ;
        obj['nextStep'] += now() + "," ;
        this.userAction.forgetPass(obj) ;
        this.navCtrl.pop() ;
    };

    postCodeFn($event){

        if(!this.postMark){
            return ;
        };

        const tel = this.phone ;

        let code = this.areaCode ;

        const postData = {
            areaCode : code ,
            phoneNumber : tel,
            verificationType : 2
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

    postMark : boolean = true ;

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

            if(this.user.hasLogin() == true){
                this.userAction.forgetPass(obj) ;
            };

            obsr.next("success") ;
        });
    })
    // @After(function($event){
    //     return new Observable( obsr => {
    //         if(ENV.env != 'debug')
    //             this.collectSer.postDeviceInfo() ;
    //         obsr.next("success") ;
    //     })
    // })
    @CombineAll()
    changePass($event){

        $event.target.disabled = true ;

        const data = this.validForm.value ;

        const model = this.loadSer.deal() ;

        model.present() ;


        let postData = {} ;
        postData['area'] = '' ;

        postData['areaCode'] = this.sgo.get("areaCode")

        postData['phoneNumber'] = this.phone ;

        postData['verificationCode'] = data['verificationCode'] ;

        postData['password'] = md5(data['password']) ;

        this.user.forgetPass(postData)
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

                    this.events.publish("login" , res.data);

                    this.sgo.set("loginInfo" , res.data) ;

                    this.navCtrl.setRoot(HomePage) ;
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
        "pageType": 2,
        "secondPassword": "",
    };

    makeRecord(name : string){
        this.riskTime[name] += now() + "," ;
    };
}