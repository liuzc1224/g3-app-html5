import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Before, CombineAll } from "../../decorators/function.decorator";
import { RegGroup } from '../../validator/regGroup/reg' ;
import { Observable } from "rxjs";
import { SesssionStorageService } from "../../service/common/storage";
import { LoadingService, TipService, UserService } from "../../service";
import { Response } from '../../share/model' ;
import { filter } from 'rxjs/operators' ;
import { HomePage } from '../home/home' ;
import { Events } from 'ionic-angular';
/**
 * Generated class for the InvatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name : "InvatePage"
})
@Component({
  selector: 'page-invate',
  templateUrl: 'invate.html',
})
export class InvatePage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams ,
      private sgo : SesssionStorageService ,
      private user : UserService ,
      private msg : TipService ,
      private loadSer : LoadingService ,
      private events : Events ,
  ) {}

  ionViewDidLoad() {
      console.log('ionViewDidLoad InvatePage');
  };

  invateCode : string  = null ;
  back(){
      this.navCtrl.pop() ;
  };

  @Before(function ($event) {
        let code = this.invateCode ;

        return new Observable( obsr => {
            if(RegGroup.invateCode(code) && code){
                obsr.next("success") ;
            }
            if(!RegGroup.invateCode(code) && code){
                this.msg.operateFail("Insira código do convite correto") ;
            };
        })
  })
  @CombineAll()
  nextBtn($event : any , pass : boolean){

      let postData = this.sgo.get("registForm") ;

      let model = this.loadSer.deal() ;

      model.present() ;

      if(this.invateCode && pass != true)
        postData['invitationCode'] = this.invateCode ;

      this.user.regist(postData)
                  .pipe(
                      filter(
                          (res : Response) => {
                              if(res.success === false){
                                  this.msg.operateFail(res.message) ;
                              };
                              model.dismiss() ;
                              $event.target.disabled = false ;

                              return res.success === true ;
                          }
                      )
                  )
                  .subscribe(
                      (res : Response ) => {
                          this.events.publish("login" , res.data);
                          this.sgo.set("loginInfo" , res.data) ;
                          this.sgo.remove(["registForm" , "registMark"]) ;
                          this.navCtrl.setRoot(HomePage) ;
                      }
                  )
  };

nextBtn2($event : any ){

  let postData = this.sgo.get("registForm") ;

  let model = this.loadSer.deal() ;

  model.present() ;

  this.user.regist(postData)
              .pipe(
                  filter(
                      (res : Response) => {
                          if(res.success === false){
                              this.msg.operateFail(res.message) ;
                          };
                          model.dismiss() ;
                          $event.target.disabled = false ;

                          return res.success === true ;
                      }
                  )
              )
              .subscribe(
                  (res : Response ) => {
                      this.events.publish("login" , res.data);
                      this.sgo.set("loginInfo" , res.data) ;
                      this.sgo.remove(["registForm" , "registMark"]) ;
                      this.navCtrl.setRoot(HomePage) ;
                  }
              )
};
}
