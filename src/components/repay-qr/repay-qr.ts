import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular' ;
import { TipService } from '../../service/common/tips/tip.service'
import { OrderService } from "../../service/order";
import { filter } from 'rxjs/operators' ;
import { Response } from '../../share/model' ;
import { LoadingService } from '../../service';
import bridge from '../../tools/bridge';
declare var JsBarcode : any ;

@Component({
    selector: 'repay-qr',
    templateUrl: 'repay-qr.html'
})
export class RepayQrComponent implements  OnInit{

    constructor(
        private nav : NavController ,
        private msg : TipService ,
        private orderSer : OrderService ,
        private navParams : NavParams,
        private load : LoadingService ,
    ){  this.allRepay=this.navParams.get("allRepay");
        this.item=this.navParams.get("item");
        this.type=this.navParams.get("type");
    } ;
    allRepay:boolean;
    item:object;
    type:string;
    ngOnInit(){
        this.orderNo = this.navParams.get("orderNo") ;
        this.resMark = true ;
        this.orderSer.getQrCode(this.orderNo)
            .pipe(
                filter(
                    ( res : Response ) => {

                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };

                        return res.success === true && res.data != null;
                    }
                )
            )
            .subscribe(
                (res : Response ) => {

                    let data = res.data ;

                    this.qrCode = data ;

                    JsBarcode("#repayQr_qr", data , {
                        format: "CODE128" ,
                        displayValue : true ,
                        text: ""
                    });

                    this.resMark = true ;

                    let img = <HTMLImageElement>document.querySelector("#repayQr_qr") ;

                    let img_sacle = <HTMLDivElement>document.querySelector("#repayQr_img") ;

                    img_sacle.style.width = window.innerHeight - 20 +'px' ;
                    img_sacle.style.height = window.innerWidth - 20 +'px' ;

                    img_sacle.style.webkitTransformOrigin = "0px" + " 0px" ;

                    img_sacle.style.background = `url(${img.src})`;
                }
            )
    };

    orderNo : string ;

    qrCode : any ;

    resMark : boolean = false ;
    isSuccess:boolean = false ;
    email:string;
    isSendEmail:boolean = false ;
    isSendSuccess:boolean = false ;
    // isSendFail:boolean = false ;
    back(){
        bridge['goBack']()
        // this.nav.pop() ;
    };

    showModal(){
        let el = <HTMLDivElement>document.querySelector(".repayQr_modal") ;
        el.style.opacity = '1' ;
        el.style.display = "block" ;
    };

    hideModal(){
        let el = <HTMLDivElement>document.querySelector(".repayQr_modal") ;
        el.style.display = "none" ;
    };

    clipText(){
        this.msg.operateSuccess() ;
        // this.clip.copy(text);
    };
    copyBoleto(){
        bridge['copy'](this.qrCode +"");
        this.isSuccess=true;
        setTimeout(()=>{
            this.isSuccess=false;
        },1000);
    }
    cancelEmailSend(){
        this.isSendEmail=false;
    }
    sendEmail(){
        this.isSendEmail=true;
        let data=Object.assign({},JSON.parse(window.sessionStorage.getItem('loginInfo')));
        this.email=data.email;
    }
    emailSubmit(){
        const model = this.load.deal();
        model.present() ;
        let data={
            emailAddress:this.email
        }
        this.orderSer.postEmail(data,this.orderNo)
            .pipe(
                filter(
                    ( res : Response ) => {
                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };
                        model.dismiss() ;
                        if(res.success===true){
                            this.isSendEmail=false;
                            this.isSendSuccess=true;
                            setTimeout(()=>{
                                this.isSendSuccess=false;
                            },1000);
                        }

                        return res.success === true && res.data != null;
                    }
                )
            )
            .subscribe(
                (res : Response ) => {

                }
            )
    }
};