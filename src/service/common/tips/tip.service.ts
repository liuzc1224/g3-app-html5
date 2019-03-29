import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TipService{
    constructor(
        private toast : ToastController ,
        private translate : TranslateService
    ){

    };


    private msgPosition : string = 'top' ;

    private msgDuration : number = 3000 ;

    private lang : object ;

    operateSuccess(msgStr : string = ''){
        const msgCss = 'c-msgToast-success' ;

        const msg = this.getLang() ;

        this.toast.create({
            message : msg['tip']['operateSuccess'] + msgStr ,
            duration : this.msgDuration ,
            position : this.msgPosition ,
            cssClass : msgCss
        }).present() ;

    };

    private getLang : Function = () : Object => {
        if(this.lang){
            return this.lang;
        }else{
            return this.lang = JSON.parse(window.sessionStorage['lang']) ;
        };
    };
    operateFail(msgStr : string = ''){
        const msgCss = 'c-msgToast-fail' ;

        const msg = this.getLang() ;


        this.toast.create({
            message : msg['tip']['operateFailWithReason'] + msgStr ,
            duration : this.msgDuration ,
            position : this.msgPosition ,
            cssClass : msgCss
        }).present();

    };

    fetchFail(msgStr : string = ''){
        const msgCss = 'c-msgToast-fail' ;

        const msg = this.getLang() ;

        this.toast.create({
            // message : msg['tip']['fetchFailReason'] + msgStr ,
            message : msgStr ,
            duration : this.msgDuration ,
            position : this.msgPosition ,
            cssClass : msgCss
        }).present() ;

    };

    operateWarn(msgStr : string){
        const msgCss = 'c-msgToast-warn' ;
        this.toast.create({
            message : msgStr ,
            duration : this.msgDuration ,
            position : this.msgPosition ,
            cssClass : msgCss
        }).present() ;
    };

    require(){
        const msg = this.getLang() ;
        this.operateWarn(msg['tip']['require']) ;
    };

    notSame(){
        const msg = this.getLang();
        this.operateWarn(msg['tip']['notSame']) ;
    }
    phoneRequire(){
        const msg = this.getLang() ;
        this.operateWarn(msg['tip']['phoneRequire']) ;
    };

    notOpen(){
        const msg = this.getLang() ;
        this.operateWarn(msg['tip']['notOpen']) ;
    };

    outOfDate(){
        const msg = this.getLang() ;
        this.operateWarn(msg['tip']['outOfDate']) ;
    };

    requestPermission(){
        const msg = this.getLang() ;
        this.operateWarn(msg['tip']['requestPermission']) ;
    };
};