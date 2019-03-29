import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

// import { RewardSerive } from '../../app/service/reward';
import { Response } from '../../share/model';
import { TipService, LoadingService, VoucherCenterService } from '../../service' ;

import { SearchModel } from './search.model';

/**
 * Generated class for the VoucherCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "voucherCenter"
})
@Component({
  selector: 'voucher-center',
  templateUrl: 'voucher-center.html',
  providers: [VoucherCenterService]
})
export class VoucherCenterPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private msg: TipService,
    private loadSer: LoadingService,
    private voucherCenterSer: VoucherCenterService,
  ) { }

  ionViewDidLoad() {
   
    this.initPage();
  }

  list: Array<object> = []; 
  totalPage: number = 1;
  searchModel: SearchModel = new SearchModel();
  showPop: boolean = false;
  succIcon: boolean

  initPage(infiniteScroll?: any) {
    let model = this.loadSer.deal() ;
    model.present() ;
    this.voucherCenterSer.getCenterReward(this.searchModel)
      .subscribe(
        (res: Response) => {
          model.dismiss() ;
          if (res.page) {
            this.totalPage = res.page['totalPage'];
          }

          if (res.success) {
            for (let i = 0; i < res.data['length']; i++) {
              res.data[i]['expDayString'] = this.formatDay(res.data[i]['expDays'],res.data[i]['dateType'] ? res.data[i]['dateType'] : 0);
            }
            this.list = this.list.concat(<Array<object>>res.data)
            if (infiniteScroll) {
              infiniteScroll.complete();
              //toast提示
              if (this.searchModel.currentPage >= this.totalPage) {
                //如果都加载完成的情况，就直接 disable ，移除下拉加载
                infiniteScroll.enable(false);
                //toast提示
                console.log("已加载所有");
              }
            }

          } else {

            this.msg.fetchFail(res.message);

          }
        }
      )
  }
  //领取优惠券
  postCenterReward(obj) {
    if (obj['receiveOrNot'] !== 1) {
      return false;
    }
    let model = this.loadSer.deal() ;

    model.present() ;
    let data = {};
    data['id'] = obj['id'];
    data['obtainType'] = obj['obtainType'];
    this.voucherCenterSer.postCenterReward(data)
      .subscribe(
        (res: Response) => {
          model.dismiss();
          if (res.success) {
            this.succIcon = true;
            this.showPop = true;
            setTimeout(() => {
              this.showPop = false;
            }, 2000);
          } else {
            // this.succIcon = false;
            // this.showPop = true;
            // setTimeout(() => {
            //   this.showPop = false;
            // }, 2000);
            this.msg.fetchFail(res.message);
          }
        }
      )
  }

  //下滑动加载数据
  doInfinite(infiniteScroll) {
    this.searchModel.currentPage += 1;
    this.initPage(infiniteScroll)
  }
  
  //有效天数转换 0天 1周 2月 3年
  formatDay(day, dateType) {
    let str = '';
    if (!day) {
      return false;
    }
    switch (dateType) {
      case 0:
        str = `Válido ${day} Dia(s) a partir de pegar`
        break;
      case 1:
        str = `Válido ${day} Semana(s) a partir de pegar`
        break;
      case 2:
        str = `Válido ${day} Mes(es) a partir de pegar`
        break;
      case 3:
        str = `Válido ${day} Ano(s) a partir de pegar`
        break;

      default:
        str = `Válido ${day} Dia(s) a partir de pegar`
        break;
    }
    return str;
  }

  back(){
      this.navCtrl.pop() ;
  };

}
