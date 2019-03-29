import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import {
    SesssionStorageService,
    UserService,
    TipService,
    LoadingService,
    UserActionService
} from '../../service' ;
import { TranslateService } from '@ngx-translate/core';
import { Response } from '../../share/model' ;
import { filter } from 'rxjs/operators' ;
import { HomePage } from '../home/home' ;
import { Events } from 'ionic-angular';
import { Observable } from "../../../node_modules/rxjs" ;
import { RegGroup } from '../../validator/regGroup/reg' ;
import { now } from "../../tools/date";
import { After, Before, CombineAll } from "../../decorators/function.decorator";
import md5 from 'js-md5';

@IonicPage({
    name : "SetPassPage"
})
@Component({
    selector: 'page-set-pass',
    templateUrl: 'set-pass.html',
})
export class SetPassPage implements OnInit {

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
        private userAction : UserActionService ,
    ){};

    ngOnInit(){
        this.initForm() ;

        let registeInfo = this.sgo.get("registInfo") ;

        this.registeInfo = registeInfo ;

        this.validForm.patchValue({
            cpf : registeInfo['cpf'] ,
            email : registeInfo['mail'] ,
            phoneNumber : registeInfo['phone']
        });

        this.getLang() ;

        this.areaCode = this.sgo.get("areaCode") ;
    };

    postCode : string = '';

    postCodeArr : Array<String> = ['' , '' , '' ,''] ;

    password : string = '' ;

    passwordAgain : string ;

    postMark : boolean = true ;

    registeInfo : Object ;

    postVerCode(){

        if(!this.postMark){
            return ;
        };

        let data = this.sgo.get("registInfo") ;

        let code = this.sgo.get("areaCode");

        const postData = {
            areaCode : code ,
            phoneNumber : data.phone ,
            verificationType : 1
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

    back(){
        let obj = this.riskTime ;
        obj['nextStep'] = now().toString() ;
        this.userAction.setPass(obj) ;
        this.navCtrl.pop() ;
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

    areaCode : string = '' ;
    initForm(){
        this.validForm = this.fb.group({
            "cpf" : [null , [Validators.required] ] ,
            "email" : [null , [Validators.required] ] ,
            "password" : [null , [Validators.required , Validators.min(6)] ] ,
            "phoneNumber" : [null , [Validators.required] ] ,
            "verificationCode" : [null , [Validators.required] ]
        });
    };

    formPatch($event){
        const el = <HTMLInputElement>$event.target ;

        this.validForm.patchValue({
            password : el.value
        });
    };
    @Before(function () {
        return new Observable(obsr => {
            let valid = RegGroup.passValid(this.password) ;

            if(!valid){
                this.msg.require();
                return ;
            };

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
    @After(function(){
        let obj = this.riskTime ;
        obj['nextStep'] = now().toString() ;
        this.userAction.setPass(obj) ;
    })
    @CombineAll()
    register($event){
        const data = this.validForm.value ;

        let postData = {} ;

        postData['cpf'] = data['cpf'] ;

        postData['email'] = data['email'] ;

        postData['chanelId'] = this.registeInfo['chanelId'] ;

        postData['timeZone'] = this.registeInfo['timeZone'] ;

        postData['password'] = md5(data['password']) ;
        postData['phoneNumber'] = data['phoneNumber'] ;
        postData['verificationCode'] = data['verificationCode'] ;

        postData['area'] = '' ;

        postData['areaCode'] = this.areaCode ;

        // this.sgo.set("registForm" , postData ) ;

        // if( mark == "regist"){
        //     this.navCtrl.push('InvatePage') ;
        // }else{
            const model = this.loadSer.deal() ;
            this.user.regist(postData)
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
                                this.sgo.set("setpassMark" , "setpass") ;
                                this.navCtrl.setRoot(HomePage) ;
                            }
                        )
        // };
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

    getSmsPermission(){

    };

    riskTime : Object ={
        "firstPassword": "",
        "secondPassword": "",
        "code" : "" ,
        "nextStep" : ""
    };

    makeRecord(type : string){
        const nowTimeStamp = now() ;

        this.riskTime[type] += nowTimeStamp + ",";

        console.log(123) ;
    };
};