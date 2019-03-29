import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SystemService, TipService , UserService } from '../../service'
import { filter } from 'rxjs/operators';
import { Response } from '../../share/model'

@IonicPage({
    name : "ServiceCenterPage"
})
@Component({
    selector: 'page-service-center',
    templateUrl: 'service-center.html',
})
export class ServiceCenterPage implements OnInit{

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams ,
        private  sysSer : SystemService ,
        private  msg : TipService ,
        private user : UserService
    ) {};

    expanConf: Array< object > ;
    ngOnInit(){
        this.getList() ;
    };

    getList(){
        this.sysSer.helpList()
            .pipe(
                filter(
                    (res : Response) => {
                        if(res.success === false){
                            this.msg.operateFail(res.message)
                        }
                        return res.success === true && res.data != null ;
                    }
                )
            )
            .subscribe(
                ( res : Response ) => {
                    this.expanConf = < Array<Object> >res.data ;
                }
            )
    };

    online(){
        if(this.user.hasLogin())
            this.navCtrl.push("OnlineServicePage")
        else
            this.navCtrl.push("LoginPage");
    };

    back(){
        this.navCtrl.pop() ;
    }
}
