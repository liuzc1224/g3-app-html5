import { Component, OnInit } from '@angular/core';
import { Events, IonicPage, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LoadingService, SesssionStorageService, TipService, UserService, UserActionService } from '../../service';
import { filter } from 'rxjs/operators';
import { Response } from '../../share/model';
import { HomePage } from '../home/home';
import { ForgetUsrpassComponent } from '../../components/forget-usrpass/forget-usrpass' ;
import { CommonValidator } from "../../validator";
import { RegGroup } from '../../validator/regGroup/reg';
import { After, Before, CombineAll } from "../../decorators/function.decorator";
import { Observable } from "rxjs";
import { now } from '../../tools/date' ;
import { ENV } from "@app/env";
import md5 from 'js-md5';
@IonicPage({
    name : "LoginPage"
})
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams ,
        private fb : FormBuilder ,
        private loadingSer: LoadingController,
        private sgo : SesssionStorageService ,
        private msg : TipService ,
        private event : Events ,
        private userSer : UserService ,
        private loading : LoadingService ,
    ) {}

    ionViewDidLoad() {

    };

    ngOnInit(){
        let mask = this.sgo.get('loginGuide');
        if (mask === 'hide') {
            this.loginGuide = false;
            this.sgo.remove(['loginGuide']);
        }
        this.initForm();

        this.lang = this.sgo.get("lang") ;

        this.enum_country = this.lang['area'] ;

        this.areaName = this.lang['register']['areaName'];

        this.sgo.set("areaCode" , 55) ;
    };

    validForm : FormGroup ;

    lang : Object ;

    enum_country : Array<any> ;

    areaName : string ;

    areaCode : number  = 55 ;

    loginGuide : boolean = true ; //登录引导页

    initForm(){
        this.validForm = this.fb.group({
            "phoneNumber" : [ null , [ Validators.required  , CommonValidator.isCpfValid ] ] ,
            "password" : [ null , [ Validators.required , CommonValidator.passValid ]]
        });
    };

    // 表单校验
    @Before(function($evnet){
        return new Observable( obsr => {
            const valid = this.validForm.valid ;
            console.log('表单校验')
            if( !valid || !this.areaCode ){
                const msg = this.lang['tip']['require'];
                this.msg.operateWarn(msg) ;
                return ;
            };
            obsr.next("success") ;
        });
    })
    @After(function($event){
        return new Observable( obsr => {
            let obj = this.riskTime ;
            obj['login'] = now() ;
            console.log("ENV.env",ENV.env)
            if(ENV.env !== 'debug'){
                this.UserAction.loginTime(obj) ;
            };
            obsr.next("success") ;
        })
    })
    @CombineAll()
    login( $event ){
        return new Observable(obsr => {
            const target = <HTMLButtonElement>$event.target ;

            const data = this.validForm.value ;

            target.disabled = true ;

            let loadingModel = this.loading.deal() ;

            let rawPass = md5(data['password']) ;
            loadingModel.present() ;

            let postData = {} ;

            postData['phoneNumber'] = data['phoneNumber'] ;

            postData['password'] = rawPass ;

            postData['areaCode'] = this.sgo.get("areaCode");

            this.sgo.remove(["registMark"]) ;

            this.userSer.login(postData)
                .pipe(
                    filter(
                        ( res : Response ) => {

                            if(res.success === false){
                                this.msg.operateFail(res.message) ;
                            };

                            loadingModel.dismiss() ;

                            target.disabled = false ;

                            return res.success === true ;
                        }
                    )
                )
                .subscribe(
                    (res : Response ) => {
                        this.sgo.set("loginInfo" , res.data) ;

                        this.event.publish("login" , res.data) ;

                        obsr.next("success") ;

                        this.navCtrl.setRoot(HomePage) ;
                    }
                );
        });
    };

    @Before(function(){
        return new Observable(obsr => {
            obsr.next("success") ;
        });
    })
    @CombineAll()
    regist(){
        if(!this.areaCode){
            this.msg.require() ;
            return ;
        };
        this.navCtrl.push("RegistPage") ;
    };

    forgetPass(){
        let phoneNumber = this.validForm.value.phoneNumber ;
        let area = this.areaCode ;
        if( phoneNumber && area ){
            this.sgo.set("phoneNumber" , phoneNumber) ;
            this.navCtrl.push(ForgetUsrpassComponent)
        } else{
            this.msg.phoneRequire() ;
        };
    };

    userCheck(){
        let val = this.validForm.value ;

        if(!RegGroup.cpfValid(val.phoneNumber)){
            return ;
        };

        if(val.phoneNumber){
            let areaCode = this.sgo.get("areaCode") ;
            this.userSer.eixt({
                phoneNumber : val.phoneNumber ,
                areaCode : areaCode
            })
                .pipe(
                    filter(
                        (res : Response) => {
                            if(res.success == false){
                                this.msg.operateFail(res.message) ;
                            };
                            return res.success == true ;
                        }
                    )
                )
                .subscribe(
                    res => {
                        if(res.code == 0){
                            this.msg.operateWarn("Esta conta não cadastrada") ;
                        };
                    }
                )
        };
    };

    riskTime : Object = {
        country : "" ,
        login : "" ,
        password :"" ,
        phoneNumber : "" ,
    };

    makeRecord(type : string){
        const nowTimeStamp = now() ;
        this.riskTime[type] += nowTimeStamp + ",";
    };
    //隐藏登陆引导页
    hideGuide(){
        this.loginGuide = false ;
    }
}