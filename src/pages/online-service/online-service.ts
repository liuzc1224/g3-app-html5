import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SystemService } from '../../service/system' ;
import { FormBuilder , FormGroup , Validators } from '@angular/forms' ;
import { Response } from '../../share/model' ;
import { filter } from 'rxjs/operators'
import { LoadingService, TipService } from "../../service/common";
import { CommonValidator } from "../../validator";
@IonicPage({
    name : "OnlineServicePage"
})
@Component({
    selector: 'page-online-service',
    templateUrl: 'online-service.html',
})
export class OnlineServicePage implements  OnInit {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams ,
        private sysSer : SystemService ,
        private  fb : FormBuilder ,
        private  msg : TipService ,
        private  loadSer : LoadingService
    ) {};

    ngOnInit(){
        this.validForm = this.fb.group({
            content :  [ '' , [Validators.required ]] ,
            title : [ null , [Validators.required ]] ,
            phoneNumber : [null , [Validators.required , CommonValidator.isNumber]] ,
            email : [null , [Validators.required , CommonValidator.isMail ]]
        });

        this.getConfig() ;
    };
    validForm : FormGroup ;

    enum_config : Array< { id : number , title : string } > ;

    getConfig(){
        this.sysSer.getFeedBackConfig()
            .pipe(
                filter(
                    (res : Response) => {
                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };
                        return res.success === true && res.data != null ;
                    }
                )
            )
            .subscribe(
                (res : Response) => {
                    console.log(res) ;
                    this.enum_config = < Array<any>>res.data ;
                }
            );
    };

    submitFeed($event){
        if(!this.validForm.valid){
            this.msg.require() ;
            return ;
        };
        const model = this.loadSer.deal() ;
        model.present() ;

        this.sysSer.postFeddBack(this.validForm.value)  
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
                (res : Response) => {
                    this.msg.operateSuccess() ; 
                    this.validForm.reset() ;
                }
            );
    }

    back(){
        this.navCtrl.pop() ;
    }
};