import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { Response } from '../../share/model' ;
import { filter } from 'rxjs/operators'
import { TipService, AccountService, SesssionStorageService, LoadingService, UserActionService } from "../../service";
import { TranslateService } from "@ngx-translate/core";
import { ListModelComponent } from "../../components/list-model/list-model";
import { CommonValidator } from "../../validator";
import { now } from "../../tools";
import { Before, CombineAll } from "../../decorators/function.decorator";
import { Observable } from "rxjs";
@IonicPage({
    name : "MakeAccountPage"
})
@Component({
    selector: 'page-make-account',
    templateUrl: 'make-account.html',
})
export class MakeAccountPage implements OnInit{

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams ,
        private fb : FormBuilder ,
        private msg : TipService ,
        private accountSer : AccountService ,
        private event : Events ,
        private translateSer : TranslateService ,
        private sgo : SesssionStorageService ,
        private modelCtr : ModalController ,
        private loadSer : LoadingService ,
        private userAction : UserActionService
    ){};
    validForm : FormGroup ;

    ngOnInit(){
        this.initForm() ;
        this.getBank() ;
        this.getLang() ;

        const bankInfo = this.sgo.get("personalBank") ;

        if(bankInfo['bankCardInfoVOS'].length > 0){

            this.validForm.patchValue(bankInfo['bankCardInfoVOS'][0]) ;
        }
    };

    initForm(){
        this.validForm = this.fb.group({
            bankId :  [null , [Validators.required]] ,
            id : [null],
            institutionNumber : [null , [ Validators.required , CommonValidator.isIdValid ]] ,
            accountNumber : [ null , [ Validators.required , CommonValidator.isIdValid ] ] ,
            accountCode : [ null , [ Validators.required ] ] ,
            accountType :[null , [ Validators.required]] ,
        });
    };

    enum_bank : Array<any> ;

    enum_accounType : Array<any> ;

    getBank(){
        this.accountSer.support()
            .pipe(
                filter(
                    (res : Response) => {

                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };

                        return res.success === true && res.data != null;
                    }
                )
            )
            .subscribe(
                (res : Response ) => {
                    let arr = [] ;
                    (< Array<any> > res.data ).forEach( item => {
                        arr.push({
                            name : item.bankName ,
                            value : item.id
                        })
                    });

                    this.enum_bank = arr ;
                }
            )
    };

    private strategy : { has : Function , no : Function} = {
        has : ($event) => {
            if(!this.validForm.valid){
                this.msg.require() ;
                return ;
            };

            $event.target.disabled = true ;

            let model = this.loadSer.deal() ;

            model.present() ;

            this.accountSer.update(this.validForm.value)
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
                    (res : Response ) => {
                        this.sgo.remove(['personalBank']) ;

                        this.event.publish("setBank" , true) ;
                        this.navCtrl.pop();
                    }
                );
        },
        no : ($event) => {
            if(!this.validForm.valid){
                this.msg.require() ;
                return ;
            };

            $event.target.disabled = true ;

            let model = this.loadSer.deal() ;

            model.present() ;

            this.accountSer.create(this.validForm.value)
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
                    (res : Response ) => {
                        this.sgo.remove(['personalBank']) ;

                        this.event.publish("setBank" , true) ;
                        this.navCtrl.pop();
                    }
                );
        }
    };

    @Before(function () {
        return new Observable( obsr => {
            let obj = this.riskTime ;
            obj['nextStep'] = now() + "," ;
            this.userAction.takeCash(obj) ;
            obsr.next("success") ;
        });
    })
    @CombineAll()
    nextBtn($event){
        let bankInfo = this.sgo.get("personalBank")['bankCardInfoVOS'] ;

        if(bankInfo.length > 0){
            this.strategy.has($event) ;
        }else{
            this.strategy.no($event);
        };
    };

    back(){
        this.navCtrl.pop() ;
    };

    // languagePack : Object ;
    getLang(){
        this.translateSer.stream(['enum'])
            .subscribe(
                res => {
                    this.enum_accounType = res['enum']['accountType'] ;
                }
            )
    };

    showModel( value :string , itemName : string ){
        let data = this[value] ;

        let model = this.modelCtr.create( ListModelComponent , { list : data } ) ;

        model.onDidDismiss(data => {
            if(data){
                let obj = {} ;
                obj[itemName] = data.value ;
                this.validForm.patchValue(obj) ;
                let el =  <HTMLInputElement>document.querySelector(`#${itemName}`) ;
                el.value = data.name ;
            };
        });
        model.present() ;
    };

    selectBank(){
        let data = this.enum_bank ;

        if(data){
            this.showModel('enum_bank' , 'bankId');
        }else{
            let model = this.loadSer.deal() ;
            model.present() ;

            let timer = setInterval(() => {
                if(this.enum_bank){
                    this.showModel('enum_bank' , 'bankId');

                    model.dismiss() ;

                    clearInterval(timer) ;
                };
            } , 50);
        };
    };


    riskTime = {
        "accountCode": "",
        "accountNumber": "",
        "accountType": "",
        "bank": "",
        "institutionNumber": "",
        "nextStep": "",
    };

    makeRecord(name : string){
        this.riskTime[name] += now() + "," ;
    };
}
