import { Component, OnInit, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MsgService, TipService } from '../../service' ;
import { SearchModel } from './searchModel' ;
import { Response } from '../../share/model' ;
import { filter } from 'rxjs/operators';
import { HomePage } from "../home/home";
@IonicPage({
    name : "MsgCenterPage"
})
@Component({
    selector: 'page-msg-center',
    templateUrl: 'msg-center.html',
})
export class MsgCenterPage implements  OnInit{

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams ,
        private  msgSer : MsgService ,
        private  msg : TipService ,
        private zone: NgZone
    ){};

    back(){
        let his = this.navCtrl;
        if (his.canGoBack()) {
            his.pop()
        } else {
            his.setRoot(HomePage)
        }
    };

    ngOnInit(){
        this.getList() ;
    };
    isLoading : boolean = true;
    searchModel : SearchModel  = new SearchModel();

    msgList : Array< Object > ;

    getList(){
        this.msgSer.getMsgList(this.searchModel)
            .pipe(
                filter(
                    (res : Response) => {
                        this.zone.run(()=>{
                            this.isLoading = false;
                        })
                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };
                        return res.success === true && res.data != null ;
                    }
                )
            )
            .subscribe(
                (res : Response) => {
                    this.searchModel.nextId = res.data['nextId'] ;

                    if(!this.msgList)
                        this.zone.run(()=>{
                            this.msgList = [] ;
                        })
                        
                    this.zone.run(()=>{
                        this.msgList = this.msgList.concat( < Array<Object> >res.data['appPushHistoryOutputBOList']) ;
                    })
                   
                }
            );
    };
}
