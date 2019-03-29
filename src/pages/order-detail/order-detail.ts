import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderService } from "../../service/order";
import { Response } from '../../share/model' ;
import { filter } from  'rxjs/operators'
import { TipService } from "../../service/common";
import { RepayQrComponent } from "../../components/repay-qr/repay-qr";
@IonicPage({
    name : "OrderDetailPage"
})
@Component({
    selector: 'page-order-detail',
    templateUrl: 'order-detail.html',
})
export class OrderDetailPage implements OnInit{

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams ,
        private orderSer : OrderService ,
        private msg : TipService
    ) {};

    ngOnInit(){
        this.orderId = this.navParams.get("id") ;
        // this.orderId = 32 ;
        this.getDetail()
    };

    orderId : number ;

    orderInfo : Object ;

    resMark : boolean = false ;

    getDetail(){

        if(this.orderId)
            this.orderSer.getDetail(this.orderId)
                .pipe(
                    filter(
                        ( res : Response ) => {

                            if(res.success === false){
                                this.msg.operateFail(res.message) ;
                            };

                            this.resMark = true ;

                            return res.success === true && res.data != null;
                        }
                    )
                )
                .subscribe(
                    (res : Response ) => {
                        this.orderInfo = res.data ;
                    }
                )
    };

    back(){
        this.navCtrl.pop() ;
    };

    transToQr(){
        const orderNo = this.orderInfo['orderNo'] ;
        this.navCtrl.push(RepayQrComponent , {
            orderNo : orderNo
        });
    }

    transSevice(){
        this.navCtrl.push("ServiceCenterPage") ;
    };
}