import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
@IonicPage({
  name : "AboutUsPage"
})
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage implements OnInit {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams , 
    private translate : TranslateService
  ){} ;

  ngOnInit(){
    this.getLang() ;
  };

  back(){
    this.navCtrl.pop() ;
  };

  dataList: Array< string > ;
  proList: Array< Object > ;
  getLang(){
    this.translate.stream(['about'])
      .subscribe(
        res => {
          this.dataList = res['about']['dataCount']['list'] ;
          this.proList = res['about']['product']['block'] ;
          
        }
      )
  }
};