import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { OrderService, TipService } from "../../service";
import { filter } from "rxjs/operators";
import { Response } from "../../share/model";
import { SearchModel } from "./searchModel";
@IonicPage({
  name: "OrderListPage"
})
@Component({
  selector: "page-order-list",
  templateUrl: "order-list.html"
})
export class OrderListPage implements OnInit {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderSer: OrderService,
    private msg: TipService
  ) {}

  ngOnInit() {
    this.getList();
  }

  back() {
    this.navCtrl.pop();
  }

  orderList: Array<Object> = [];

  searchModel: SearchModel = new SearchModel();

  getList($event?) {
    this.orderSer
      .getRecord(this.searchModel)
      .pipe(
        filter((res: Response) => {
          if (res.success === false) {
            this.msg.operateFail(res.message);
          }

          return res.success === true && res.data != null;
        })
      )
      .subscribe((res: Response) => {
        if ($event) $event.complete();

        if (!this.orderList) {
          this.orderList = [];
        }
        this.orderList = this.orderList.concat(res.data);
      });
  }

  doInfinite($event) {
    this.searchModel.currentPage += 1;
    this.getList($event);
  }

  goToDetail(item) {
    console.log(item);
    if (item.orderType === 1) {
      this.navCtrl.push("StageRepayPage", {
        orderId: item.orderId,
        orderNo: item.orderNo,
        type: 1
      });
    } else {
      this.navCtrl.push("OrderDetailPage", {
        id: item.orderId
      });
    }
  }
}
