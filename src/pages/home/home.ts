import { Component, OnInit, NgZone } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { LoadingService, OrderService, SesssionStorageService, TipService } from '../../service';
import { filter } from 'rxjs/operators';
import { Response } from '../../share/model/index';
import { Storage } from '@ionic/storage' ;
import { DownloadModel } from '../../share/model/download.model' ;
import {RepayQrComponent} from '../../components/repay-qr/repay-qr';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit{

    showInvate: boolean = false;
    showCashPop: boolean = false;

    constructor(
        public navCtrl: NavController ,
        private sideMenu : MenuController ,
        private sgo : SesssionStorageService ,
        private msg : TipService ,
        private orderSer : OrderService ,
        private ls : Storage ,
        private load : LoadingService ,
        private zone: NgZone
    ){}

    //非强制更新时 单次启动只弹一次
    firstShowUpdateApp : any;


    ngOnInit(){
        this.loginInfo = this.sgo.get("loginInfo") ;
        const mark = this.sgo.get("registMark") ;
        const setmark = this.sgo.get("setpassMark") ;
        const showCashPop = this.sgo.get("showPop") ;
        this.firstShowUpdateApp = this.sgo.get("firstShowUpdateApp") ;

        if ( mark === "regist" && setmark === "setpass" ) {
            //显示邀请码弹框
            this.showInvate = true;
            this.sgo.remove(["registMark" , "setpassMark"]) ;
        }

        if (showCashPop === 'accountCash') {
            this.showCashPop = true;
        }
        if(this.loginInfo){
            this.getLatestOrder() ;
            this.getAwardPop() ;
        }else{
            this.orderInfo = 'default' ;
            this.showLoading = false ;
        };

        this.ls.get("isFirst")
            .then(
                res => {
                    // this.isFirst = !res ;
                }
            );

        this.sideMenu.swipeEnable(false) ;


        this.checkUpdate() ;

    };
    loginInfo : Object = null ;

    isFirst : boolean = true ;

    switchMenu(){
        this.sideMenu.toggle() ;
    };

    goToMsg(){
        if(this.loginInfo){
            this.navCtrl.push("MsgCenterPage") ;
        }else{
            this.navCtrl.push("LoginPage")
        };
    };
    orderInfo : Object ;
    getLatestOrder($event?){
        this.orderSer.getLatest()
            .pipe(
                filter(
                    ( res : Response ) => {
                        this.zone.run(()=>{
                            this.showLoading = false ;
                        })

                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };

                        if(res.data == null){
                            this.orderInfo = 'default' ;
                        };

                        if($event){
                            $event.complete();
                        };

                        return res.success === true && res.data != null;
                    }
                )
            )
            .subscribe(
                (res : Response ) => {
                    this.zone.run(()=>{
                        this.orderInfo = res.data ;
                    })
                    this.sgo.set("orderInfo" , res.data) ;
                }
            );
    };
    awardPopInfo : object;
    getAwardPop(){
        // this.sysSer.getCouponPop()
        //     .subscribe(
        //         ( res : Response ) => {
        //             if (res.success) {
        //                 if (res.data['length']) {
        //                     this.awardPopInfo = res.data[0] ;
        //                     this.showRewardPop = res.data[0]['isJump'];
        //                 }
        //             }
        //         }
        //     )
    }

    enter(){
        this.ls.set("isFirst" , "false") ;
        this.isFirst = true ;
    };

    doRefresh($event){
        if(this.loginInfo){
            this.getLatestOrder($event) ;
        }else{
            $event.complete() ;
        };
    };

    showLoading : boolean = true;

    checkUpdate(){
    };

    showUpdateApp : boolean = false ;

    updateInfo : Object ;

    closeUpdate(){
        this.showUpdateApp = false ;
        this.sgo.set("firstShowUpdateApp",true)
    };

    // downloadPercent : number = 0 ;

    forceUpdae($event){
        let el = <HTMLButtonElement>$event.target ;
        el.disabled = true ;

        let url = this.updateInfo['apkUrl'] ;
        let wrap = <HTMLDivElement>document.querySelector("#process") ;
        wrap.style.display = 'block' ;

        // let url = "https://s3-sa-east-1.amazonaws.com/hujin2-s1/apk/br/resources-MyLoan/android.apk" ;
        if(!url){
            this.msg.operateFail() ;
            return ;
        };
        let obj = {
            apkUrl : url ,
            apkName : "MyLoan"
        };
        // cordova
        //     .plugins
        //     .CheckAppUpdate
        //     .coolMethod("downApk" , obj , (data : DownloadModel) => {
        //         if(data['status'] == 1){
        //             let el = <HTMLDivElement>document.querySelector("#downloadPress") ;
        //             el.style.width = data.data + "%" ;
        //             // this.downloadPercent = <number>data.data ;
        //             console.log(data) ;
        //         };

        //         if(data.status == 2){
        //             this.showUpdateApp = false ;
        //             this.msg.operateFail("Falha de baixar, tente novamente depois") ;
        //             el.disabled = false ;
        //         };

        //         if(data.status == 3){
        //             this.showUpdateApp = false ;
        //             el.disabled = false ;
        //         };

        //     } , err => {
        //         console.log("got an err ") ;
        //         console.log(err);
        //         this.msg.operateFail() ;
        //         this.showUpdateApp = false ;
        //     });
    };

    closeCashPop(){
        this.showCashPop = false;
        this.sgo.remove(["showPop"]) ;
    }

    //优惠券推送弹框
    showRewardPop: boolean = false;
    closeRewardPop(){
        this.showRewardPop = false;
    }
    //跳转下载流量产品页
    dowload(){
        window.location.href = 'https://play.google.com/store/apps/details?id=com.moneymanager.br'
    }
    test(){
        // this.navCtrl.push(RepayQrComponent)
    }
};