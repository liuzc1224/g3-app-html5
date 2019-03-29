import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StagingDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "StagingDetailsPage",
})
@Component({
  selector: 'page-staging-details',
  templateUrl: 'staging-details.html',
})
export class StagingDetailsPage {

  detailInfo: Array<Object> = [];
  repayTotalAmount: any = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.detailInfo = this.navParams.get('detailInfo');
    this.repayTotalAmount = this.navParams.get('repayTotalAmount');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StagingDetailsPage');
  }
  back() {
    this.navCtrl.pop();
  };
}
