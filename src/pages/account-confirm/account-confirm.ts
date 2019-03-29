import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService, LoadingService, OrderService, SesssionStorageService, TipService } from '../../service';
import { Response } from '../../share/model';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { SearchModel } from './searchModel';
import bridge from '../../tools/bridge';
import md5 from 'js-md5';
declare var IosSelect  : any ;
@IonicPage({
    name : "AccountConfirmPage",
    segment: 'account-confirm/:type/:auditOrderId/:productId/:orderId'
})
@Component({
    selector: 'page-account-confirm',
    templateUrl: 'account-confirm.html',
})
export class AccountConfirmPage implements OnInit{
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams ,
        private orderSer : OrderService ,
        private msg : TipService ,
        private sgo : SesssionStorageService ,
        private translateSer : TranslateService ,
        private accountSer : AccountService ,
        private event : Events ,
        private load : LoadingService ,
        private nav : NavController ,
    ){
        this.type = this.navParams.get('type');
        this.auditOrderId = this.navParams.get('auditOrderId');
        this.orderId = this.navParams.get('orderId');
        this.productId = this.navParams.get('productId');
    };
    type: any = 1;//1 一次性， 2分期
    auditOrderId: any;//信审订单id
    orderId: any;//订单id
    productId: any;//产品id
    searchModel: SearchModel = new SearchModel();

    ngOnInit(){
        this.searchModel.productId = this.productId;
        this.searchModel.auditOrderId = this.auditOrderId;
        this.getLang() ;

        this.getBank() ;

        this.getPlan() ;

        this.event.subscribe("setBank" , (data) => {
            if(data){
                this.getBank() ;
                this.first = false ;
                this.pdfUrl = null ;
            };
        });

        this.event.subscribe("chooseAward" , (data) => {
            if(data){

                this.couponInfo = data['item'];
                this.couponId = data['couponId']
                this.getPlan();
                console.log(this.couponInfo);
            };
        });

        this.first = !!this.sgo.get("firstMark");
    };

    ngAfterViewInit() {
        // this.creatSelect() ;
    };


    couponId: any;//优惠券ID

    couponInfo: object;//优惠券信息

    resMark : boolean ;

    shouldPay : any ;

    account : string = '' ;

    cashInfo: Object;

    bankInfo : Array<any> = null ;

    broMoney: Number; //借款金额

    getPlan(){
        let pra = this.searchModel;
        let httpName = 'pettyLoan';
        pra['borrowAmount'] = this.broMoney;//借款金额
        pra['borrowTime'] = this.broDateVal; //借款期限
        pra['couponId'] = this.couponId;//优惠券

        if (this.type == 1) {
            httpName = 'pettyLoan';
        }else{
            httpName = 'installment';
        }

        this.orderSer[httpName](pra)
            .pipe(
                filter(
                    ( res : Response ) => {

                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };
                        return res.success === true ;
                    }
                )
            )
            .subscribe(
                (res : Response ) => {
                    this.cashInfo = res.data;
                    if (!this.optionData) {
                        this.broDateVal = res.data['borrowTimeList'][0]
                        this.broMoney = res.data['minBorrowAmount'];
                        this.optionData = this.creatSelectArr(res.data['borrowTimeList']);
                        // this.shouldPay = res.data['totalRepay'] ;
                        this.creatSelect('broDate', 'broDateVal') ;
                    }
                }
            )
    };

    creatSelectArr(arr){
        let info = [];
        arr.forEach((val, i) => {
            info.push({
                id: i,
                value: val
            })
        });
        return info;
    }

    optionData : Array<any>
    // = [{id:1,value:'123Dias'},{id:2,value:'asdDias'},{id:3,value:'xcafdDias'},{id:4,value:'xoaopsdpoDias'}]
    @ViewChild('broDate')
    broDate: ElementRef;

    broDateVal:any;
    creatSelect(clickDom, value){
        var that = this;
        setTimeout(() => {
            var dom = this[clickDom]['nativeElement'];// 绑定一个触发元素
            dom.addEventListener('click', function () {  // 添加监听事件
                var val = dom.dataset['id'] || 0;
                new IosSelect(1,               // 第一个参数为级联层级，演示为1
                    [that['optionData']],                             // 演示数据
                    {
                        title: '选择借款期限',                    // 标题
                        sureText: 'ok',
                        closeText: 'no',
                        cssUnit: 'px',
                        itemHeight: 50,                      // 每个元素的高度
                        itemShowCount: 3,                    // 每一列显示元素个数，超出将隐藏
                        oneLevelId: val,                     // 第一级默认值
                        callback: function (selectOneObj) {  // 用户确认选择后的回调函数
                            that[value] = selectOneObj.value;
                            // dom.innerHTML = selectOneObj.value;
                            dom['dataset']['id'] = selectOneObj.id;
                            dom['dataset']['value'] = selectOneObj.value;
                            that['getPlan']();
                        }
                });
            });
        }, 0);
    }

    languagePack : Object ;

    getLang(){
        this.translateSer.stream(['orderList'])
            .subscribe(
                res => {
                    this.account = res['orderList']['noBind'] ;
                    this.padTitle = res['orderList']['padTitle'] ;
                }
            )
    };

    padShow : boolean = false ;

    padTitle : string ;

    first : boolean = false ;

    access(){
        //勾选按钮 只获取合同地址，不展示pdf ,返回成功时改变选框状态 ;
        if(this.pdfUrl){
            this.first = !this.first ;
            this.sgo.set("firstMark" , !!this.first) ;
            return ;
        }else{
            this.getPdfUrl(false) ;
        };
    };

    numCancel($event){
        this.padShow = false ;
    };

    numComplete($event){
        let payPass = md5($event.data.toString()) ;

        let id = this.bankInfo[0]['id'];
        let bankName = this.bankInfo[0]['bankName'];
        let bankCardNum = this.bankInfo[0]['accountNumber'];

        let couponId = this.couponId;
        let postData = {}
        if (this.type == 1) {
            postData['amount']  = this.broMoney;
            postData['bankCardId'] = id ;
            postData['payPassword'] = payPass ;
            postData['loanDays'] = this.broDateVal;
            postData['couponId'] = couponId ;
            postData['productId'] = this.productId;
        }else{
            postData['auditOrderId'] = this.auditOrderId;
            postData['productId'] = this.productId;
            postData['borrowAmount']  = this.broMoney;
            postData['borrowTime'] = this.broDateVal;
            postData['payPassword'] = payPass ;
            postData['bankName'] = bankName ;
            postData['bankCardNumber'] = bankCardNum ;
            postData['couponId'] = couponId ;
        }

        this.padShow = false ;

        let model = this.load.deal() ;
        model.present() ;
        if (this.type == 1) {
            this.oldCash(postData, model)
        }else{
            this.newCash(postData, model)
        }

    };
    //一次性还本付息产品提现
    oldCash(postData: object, model:any){
        this.accountSer.takeCash(postData , this.orderId)
                .pipe(
                    filter(
                        ( res : Response ) => {

                            if(res.success === false){
                                this.msg.operateFail(res.message) ;
                                this.padShow = true ;
                            };

                            model.dismiss() ;
                            return res.success === true ;
                        }
                    )
                )
                .subscribe(
                    (res : Response ) => {

                        this.sgo.remove(['firstMark']) ;

                        this.sgo.set("showPop", "accountCash");

                        this.msg.operateSuccess() ;

                        bridge['goHome']()
                    }
                )
    }

     //分期产品提现
     newCash(postData: object, model:any){
        this.accountSer.takeCashInst(postData)
                .pipe(
                    filter(
                        ( res : Response ) => {

                            if(res.success === false){
                                this.msg.operateFail(res.message) ;
                                this.padShow = true ;
                            };

                            model.dismiss() ;
                            return res.success === true ;
                        }
                    )
                )
                .subscribe(
                    (res : Response ) => {

                        this.sgo.remove(['firstMark']) ;

                        this.sgo.set("showPop", "accountCash");

                        this.msg.operateSuccess() ;

                        bridge['goHome']()
                    }
                )
    }

    makeAccount(){
        this.navCtrl.push("MakeAccountPage") ;
    };

    //选择优惠券 未完成，暂时不上
    // makeAward(){

    //     this.navCtrl.push("chooseReward", { auditMoney: this.orderInfo['auditMoney'], couponId: this.couponId }) ;

    // };


    getBank(){
        this.accountSer.bankList()
            .pipe(
                filter(
                    ( res : Response ) => {

                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };

                        return res.success === true && res.data != null  ;
                    }
                )
            )
            .subscribe(
                (res : Response ) => {
                    

                    this.resMark = true ;

                    this.bankInfo = <Array<any>>res.data['bankCardInfoVOS'];

                    this.sgo.set("personalBank" , res.data) ;

                    if(res.data['bankCardInfoVOS'].length > 0 && res.data['bankCardInfoVOS'][0]['accountNumber']){
                        this.account = res.data['bankCardInfoVOS'][0]['accountNumber'].toString().substr(0, 3) + "****" ;
                    };
                }
            );
    };

    wrapShow : boolean  = false ;

    apply($event){
        console.log(this.type);
        console.log(this.first);
        if(this.first === true || this.type == 2){
            this.accountSer.hasPayPass()
                .pipe(
                    filter(
                        ( res : Response ) => {
                            if(res.success === false){
                                this.msg.operateFail(res.message) ;
                            };
                            $event.target.disabled = false ;
                            return res.success === true && res.data != null ;
                        }
                    )
                )
                .subscribe(
                    (res : Response) => {
                        if(res.data === false){
                            this.wrapShow = true ;
                        }else{
                            this.padShow = true ;
                        };
                    }
                );
        }else{
            this.msg.require() ;
        };
    };

    hide(){
        this.wrapShow = false ;
    };

    sure($event){
        this.wrapShow = false ;
        this.nav.push("AccountPayPassPage") ;
    };

    pdfUrl : string = '' ;
    showPdfHtml(url){
        let encodeUrl = encodeURIComponent(this.pdfUrl);
        let pdfUrl = '../assets/pdfShow/web/viewer.html?file=' + encodeUrl;
        window.open(pdfUrl, "_self");
    }

    postMark : boolean  = false ;
    //勾选时获取合同地址  isShow 是否展示合同
    getPdfUrl(isShow){
        let bankInfo = this.bankInfo ;

        if(bankInfo.length == 0){
            // this.navCtrl.push("MakeAccountPage") ;
            this.msg.operateWarn("Cartão bancário não vinculado, vai para vincular") ;
            return ;
        };

        if(this.pdfUrl && isShow){
            this.showPdfHtml(this.pdfUrl);
            return ;
        };

        let __this = this;

        if(!this.bankInfo){
            this.msg.require();
            return ;
        };

        let model = this.load.deal();

        model.present() ;

        let id = this.bankInfo[0]['id'];


        let postData = {
            amount  : this.broMoney ,
            bankCardId : id ,
            loanDays : this.broDateVal,
            productId : this.productId
        };

        this.postMark = true ;

        this.accountSer.getContract(this.orderId , postData)
            .pipe(
                filter(
                    (res : Response) => {

                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };

                        model.dismiss() ;

                        this.postMark = false ;

                        return res.success === true ;
                    }
                )
            )
            .subscribe(
                ( res : Response) => {
                    this.pdfUrl = <string>res.data ;
                    if (isShow) {
                        __this.showPdfHtml(res.data) ;
                    }else{
                        __this.first = !__this.first ;
                        this.sgo.set("firstMark" , !!__this.first) ;
                    };
                }
            );
    };

    goStagingDetails(){
        this.navCtrl.push('StagingDetailsPage', {
            detailInfo: this.cashInfo['installmentDetailVOS'],
            repayTotalAmount: this.cashInfo['repayTotalAmount']
        })
    }

    //检测输入金额
    checkBroMoney(e){
        let val = Number(e.value);
        let step = this.cashInfo['loanQuotaIncrease'];
        let max = this.cashInfo['maxBorrowAmount'];
        let min = this.cashInfo['minBorrowAmount'];
        let halfStep = step/2;
        let remainder = val % step;

        if (val > max) {
            this.broMoney = max
        }else if(val < min){
            this.broMoney = min
        }else if(remainder > 0 && remainder < halfStep ){
            this.broMoney = val - remainder;
        }else if(remainder >= halfStep){
            this.broMoney = val + step - remainder;
        }
        this.getPlan();
    }
};