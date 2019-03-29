import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { OrderService } from "../../service/order/order.service";
import { TipService } from "../../service";
@IonicPage({
  name: "StageOrderDetail"
})
@Component({
  selector: "page-stage-order-detail",
  templateUrl: "stage-order-detail.html"
})
export class StageOrderDetailPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    private msg: TipService
  ) {
    this.id = this.navParams.get("id");
  }
  id: string;
  listData: object;
  result:object;
  ngOnInit() {
    this.getInfo();
  }
  getInfo() {
    this.orderService.getStageOrderInfo(this.id).subscribe(res => {
      if (res["success"] && res["data"]) {
        // res['data']={
        //   createTime :"2019.1.1",
        //   currentPeriod :"1",
        //   currentRepay :"1965.32568",
        //   financingAmount :"4521.32698",
        //   lendRateMoney :"1234.23659",
        //   overDueFine :"13.3659874",
        //   planRepaymentDateStr :"2019.2.3",
        //   realRepayMoney :"123.3215",
        //   repayStatus :"4",
        //   settleDateStr :"5",
        //   totalPeriod :"6"
        // }
        this.listData = res["data"];
        switch (this.listData["repayStatus"]) {
          case 4: 
            this.listData['repayStatusTxt'] = "Pago e quitado"; //已还已结清
            break;
          case 6: 
            this.listData['repayStatusTxt'] = "Vencido e quitado"; //逾期已结清
            break;
          default:
            this.listData['repayStatusTxt'] = "Quitado";
            break;
        }
        this.listData['currentRepay']=this.initNumber(this.listData['currentRepay']);
        this.listData['financingAmount']=this.initNumber(this.listData['financingAmount']);
        this.listData['lendRateMoney']=this.initNumber(this.listData['lendRateMoney']);
        this.listData['overDueFine']=this.initNumber(this.listData['overDueFine']);
        this.listData['realRepayMoney']=this.initNumber(this.listData['realRepayMoney']);
        this.result=this.listData;
      } else {
        this.msg.fetchFail(res["message"]);
      }
    });
  }
  initNumber(data) {
    if(data){
      let result_data = parseFloat(data).toFixed(2);
    // result = result.replace(".", ",");
      return result_data;
    }else{
      return '0.00';
    }
  }
}
