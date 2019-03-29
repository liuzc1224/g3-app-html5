import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { OrderService } from "../../service/order/order.service";
import { RepayQrComponent } from "../../components/repay-qr/repay-qr";
import { TipService } from "../../service";

@IonicPage({
  name: "StageRepayPage",
  segment: "stage-repay/:orderId/:orderNo/:type"
})
@Component({
  selector: "page-stage-repay",
  templateUrl: "stage-repay.html"
})
export class StageRepayPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    private msg: TipService
  ) {
    this.orderId = this.navParams.get("orderId");
    this.orderNo = this.navParams.get("orderNo");
    this.type = this.navParams.get("type");
  }
  orderId: string;
  orderNo: string;
  type: string;
  basicInfo: object;
  detailInfo: object;
  repayList: Array<object> = [];
  isClosed:boolean=false;
  ngOnInit() {
    this.getList();
  }
  getList() {
    this.orderService.getRepaymentList(this.orderNo).subscribe(res => {
      if (res["success"] && res["data"]) {
        // res["data"]={
        //   loanDateStr:"2018/11/20",
        //   currentRepay :this.initNumber("568.000011"),
        //   stagesTotalAmount:"9550,00",
        //   charge :"200,00",
        //   orderNo:"bx959623673264095",
        //   totalFinancingMoney:"415,00"
        // }
        this.isClosed=res['data']['settle'];
        this.detailInfo = {
          loanDateStr: res["data"]["loanDateStr"],
          currentRepay: this.initNumber(res["data"]["currentRepay"]),
          stagesTotalAmount: this.initNumber(res["data"]["stagesTotalAmount"]),
          charge: this.initNumber(res["data"]["charge"]),
          orderNo: res["data"]["orderNo"],
          totalFinancingMoney: this.initNumber(
            res["data"]["totalFinancingMoney"]
          )
        };
        // res["data"]["stagesRepayInfoVOList"]=[
        //   {status:1,currentPeriod:"1",totalPeriod:"6",periods:"1/6",planRepaymentDateStr:"2018/11/20",currentRepay:"12.010",financingMoney:"23.080",interest:"50.500",id:"1"},
        //   {status:3,currentPeriod:"2",totalPeriod:"6",periods:"2/6",planRepaymentDateStr:"2018/11/20",currentRepay:"12.900",financingMoney:"23.600",interest:"50,00",id:"2"},
        //   {status:4,currentPeriod:"3",totalPeriod:"6",periods:"3/6",planRepaymentDateStr:"2018/11/20",currentRepay:"12,00",financingMoney:"23,00",interest:"50,00",id:"1"},
        //   {status:5,currentPeriod:"4",totalPeriod:"6",periods:"4/6",planRepaymentDateStr:"2018/11/20",currentRepay:"12,00",financingMoney:"23,00",interest:"50,00",overDueRateMoney:"2323.700",id:"1"},
        //   {status:6,currentPeriod:"5",totalPeriod:"6",periods:"5/6",planRepaymentDateStr:"2018/11/20",currentRepay:"12,00",financingMoney:"23,00",interest:"50,00",id:"1"},
        //   {status:8,currentPeriod:"6",totalPeriod:"6",periods:"6/6",planRepaymentDateStr:"2018/11/20",currentRepay:"12,00",financingMoney:"23,00",interest:"50,00",id:"1"}
        // ];
        this.repayList = res["data"]["stagesRepayInfoVOList"].map(item => {
          item["currentRepay"] = this.initNumber(item["currentRepay"]);
          item["financingMoney"] = this.initNumber(item["financingMoney"]);
          item["interest"] = this.initNumber(item["interest"]);
          item["overDueRateMoney"] = this.initNumber(item["overDueRateMoney"]);
          return item;
        });
      } else {
        this.msg.fetchFail(res["message"]);
      }
    });
  }
  goRepay(item) {
    this.navCtrl.push(RepayQrComponent, {
      allRepay: false,
      item: item,
      type: this.type,
      orderNo: this.orderNo
    });
  }
  goRepayAll() {
    this.navCtrl.push(RepayQrComponent, {
      allRepay: true,
      item: this.detailInfo,
      type: this.type,
      orderNo: this.orderNo
    });
  }
  goStageOrderDetail(id) {
    this.navCtrl.push("StageOrderDetail", { id: id });
  }
  goOrderDetail() {
    this.navCtrl.push("OrderDetailPage", { id: this.orderId });
  }
  initNumber(data) {
    let result = parseFloat(data).toFixed(2);
    result = result.replace(".", ",");
    return result;
  }
}
