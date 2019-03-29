import { Component, OnInit } from '@angular/core';
import { NavController  , MenuController } from 'ionic-angular';
import { daysLater, now } from '../../tools/date' ;
import { TipService, SesssionStorageService, UserService } from '../../service' ;
import { Before, CombineAll , After } from "../../decorators/function.decorator";
import { Observable } from "rxjs";
/**
 * Generated class for the ApplyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'apply',
    templateUrl: 'apply.html'
})
export class ApplyComponent implements OnInit {
    text: string;
    constructor(
        private navCtrl : NavController ,
        private sideMenu : MenuController ,
        private sgo : SesssionStorageService ,
        private userSer : UserService ,
        private msg : TipService
    ){
        this.text = 'Hello World';
    };

    ngOnInit(){
        this.repayDate = daysLater(this.limitDay) ;
        this.calcRate() ;
        console.log("apply initial")
    };

    @Before(function () {
        return new Observable(obsr => {
            let hasLogin = this.userSer.hasLogin();
            if(!hasLogin){
                this.navCtrl.push("LoginPage") ;
                return ;
            }else{
                obsr.next("success") ;
            };
        }) ;
    })
    @After(function(){
        return new Observable( obsr => {
            let hasLogin = this.userSer.hasLogin() ;

            if(hasLogin){
                let data = this.riskTime ;
                data['nextStep'] = now().toString() ;
                this.userAction.home(data)

            };
            obsr.next("success") ;
        });
    })
    @CombineAll()
    makeLoan($event){
        const money = this.limitMount ;
        const days = this.limitDay ;
        const loanInfo = {
            money : money ,
            days : days
        };
        this.sgo.set("loanInfo" , loanInfo) ;
        this.navCtrl.push("LoanPurposePage") ;
        // this.navCtrl.push("ReviewPage") ;
    };

    switchMenu(){
        this.sideMenu.toggle() ;
    };

    limitMount : number = 500 ;

    limitDay : number = 7 ;

    range : { mount : { min : number , max : number } , day : { min : number , max : number } } = {
        mount : {
            max : 1500 ,
            min : 500
        },
        day : {
            max : 100 ,
            min : 0
        }
    };

    rate : any = 0 ;

    rateDay : any = '1%' ;

    rateYear : any = '365%' ;

    repayDate : any = '' ;

    private strategy = {
        "mount" : (val , target) => {
            const split = 100 ;

            const deviation = split / 2 ;

            let range = this.getNumber(val.toString()) ;

            if(range.raw >= ( range.data - deviation ) && range.raw <  ( range.data + deviation )  ){
                this.limitMount = range.data ;
                this.calcRate() ;
            };

            let el = <HTMLSpanElement>document.querySelector("#text_count") ;

            let w_width = target.offsetWidth - el.offsetWidth ;

            el.style.left = (val - 500) * w_width / ( this.range.mount.max - this.range.mount.min ) + 'px' ;

        },
        "day" : (val , target)  => {

            if(val >= 50 && val <= 100 ){
                this.limitDay = 14 ;
                this.calcRepayDate() ;
                this.calcRate()
            };

            if(val >= 0 && val < 50){
                this.limitDay = 7 ;
                this.calcRepayDate() ;
                this.calcRate()
            };

            //
            // if(val == 100){
            //
            //     this.limitDay = 14 ;
            //
            //     this.calcRepayDate();
            //     this.calcRate();
            //
            // };

            let el = <HTMLSpanElement>document.querySelector("#text_day") ;

            let w_width = target.offsetWidth - el.offsetWidth ;

            el.style.left = val * w_width / ( this.range.day.max - this.range.day.min ) + 'px' ;
        }
    };

    rangeChange($event , type){

        const el = <HTMLInputElement>$event.target ;

        const value = Number(el.value) ;

        this.strategy[type].call(this, value , el) ;
    };

    private getNumber( count : string){
        let len = count.length ;

        let number = {
            raw : Number(count) ,
            data : null
        };

        if(len == 3){
            let data = count.substr(0 ,1) ;

            number.data = Number(data + '00');
        };

        if(len == 4){
            let data = count.substr(0 ,2) ;
            number.data = Number(data + '00');
        };

        return number ;
    };

    calcRepayDate(){
        const days = this.limitDay ;

        this.repayDate = daysLater(days) ;
    };

    calcRate(){
        const rate = parseInt(this.rateDay) / 100;

        const days = this.limitDay ;

        this.rate = Number( (rate * days * this.limitMount).toFixed(2) );
    };

    transSevice(){
        if(this.userSer.hasLogin())
            this.navCtrl.push("ServiceCenterPage") ;
        else
            this.navCtrl.push("LoginPage");

    };

    riskTime : Object = {
        "dateClickEnd": "",
        "dateClickStart": "",
        "moneyClickEnd": "",
        "moneyClickStart": "",
        "nextStep": ""
    };

    makeRecord(type : string){
        this.riskTime[type] += now() + "," ;
    };
};