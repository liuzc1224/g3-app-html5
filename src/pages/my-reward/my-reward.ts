import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Response } from '../../share/model';
import { TipService, LoadingService, RewardService } from '../../service' ;

import { SearchModel } from './search.model';

/**
 * Generated class for the MyRewardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage({
  name: "MyRewardPage"
})
@Component({
  selector: 'my-reward',
  templateUrl: 'my-reward.html',
  providers: [RewardService]
})
export class MyRewardPage {
  parent : Object ;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private msg: TipService,
    private loadSer: LoadingService,
    private rewardSer: RewardService,
  ) {
    this.parent = this ;
  }

  rewardList: Array<object> = [];
  totalPage: number = 1;
  infiniteScroll: any ;


  dw: Array<string> = ['','R$','%','dias']
  searchModel: SearchModel = new SearchModel();



  ionViewDidLoad() {
    this.getList();
  }


  getList(infiniteScroll? : any) {
    let model = this.loadSer.deal() ;

    model.present() ;
    this.rewardSer.getMyReward(this.searchModel)
      .subscribe(
        (res: Response) => {
          model.dismiss();
          if (res.page) {
            this.totalPage = res.page['totalPage'] ;
            console.log(this.totalPage);
          }
          if (res.success) {
            // this.rewardList = <Array<object>>res.data;
            this.rewardList = this.rewardList.concat(<Array<object>>res.data)
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

  //tab切换
  choose(type) {
    this.searchModel.status = type ;
    this.rewardList = [];
    this.searchModel.currentPage = 1 ;
    this.getList();
    if (this.infiniteScroll) {
      this.infiniteScroll.enable(true);
    }
  }


  goDetail(item){
    this.navCtrl.push('rewardDetail', {
      info: item
    })
  }

  goCenter(parent){
    parent['navCtrl'].push('voucherCenter')
  }

  //下滑动加载数据
  doInfinite(infiniteScroll) {
    this.searchModel.currentPage += 1;
    this.infiniteScroll = infiniteScroll;
    this.getList(infiniteScroll)
  }

  back(){
      this.navCtrl.pop() ;
  };


}
