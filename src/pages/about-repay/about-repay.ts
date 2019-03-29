import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core' ;
@IonicPage({
  name : "AboutRepayPage"
})
@Component({
  selector: 'page-about-repay',
  templateUrl: 'about-repay.html',
})
export class AboutRepayPage implements OnInit {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams , 
    private translate : TranslateService
  ) {};

  ngOnInit(){
    this.getLang() ;
  }

  getLang(){
    this.translate.stream(['aboutRepay.block'])
      .subscribe(
        res => {
          this.dataBlock = res['aboutRepay.block']
        }
      )
  };

  dataBlock : Array<Object> ; 

  back(){
    this.navCtrl.pop() ;
  };
};