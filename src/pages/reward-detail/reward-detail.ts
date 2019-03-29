import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SesssionStorageService } from '../../service' ;
/**
 * Generated class for the RewardDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'rewardDetail'
})
@Component({
  selector: 'reward-detail',
  templateUrl: 'reward-detail.html',
})
export class RewardDetailPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sgo : SesssionStorageService ,
  ) {
    this.info = this.navParams.get('info')
    console.log(this.info);
  }
  info: any;
  regx: RegExp = /-/g;
  phone: any;
  userInfo: any;
  ionViewDidLoad() {
    this.userInfo = this.sgo.get('loginInfo');
    console.log(this.userInfo)
  }

  back(){
      this.navCtrl.pop() ;
  };

}
