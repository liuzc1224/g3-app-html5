import { Component, OnInit, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TipService, SesssionStorageService, UserService, LoadingService } from '../../service' ;
import { Before, CombineAll , After } from "../../decorators/function.decorator";

import { filter } from 'rxjs/operators' ;
import { Response } from '../../share/model' ;
/**
 * Generated class for the ApplyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'invate',
    templateUrl: 'invate.html'
})
export class InvateComponent implements OnInit {
    text: string;
    @Input() isShow: boolean = false;
    constructor(
        private navCtrl : NavController ,
        private sgo : SesssionStorageService ,
        private userSer : UserService ,
        private msg : TipService,
        private loadSer : LoadingService ,
    ){

    };

    postCode : string = '';
    postCodeArr : Array<String> = ['' , '' , '' , '', '' , ''] ;


    ngOnInit(){

    };

    passInput($event){
        const el = < HTMLInputElement >$event.target ;
        const len = el.value.length ;

        console.log(el.value,'postCode')

        this.postCodeArr = [] ;

        for(let i = 0 ; i < len ;  i++ ){
            this.postCodeArr.push(el.value.charAt(i));
        };
    };

    @CombineAll()
    nextBtn(){

        let model = this.loadSer.deal() ;
        model.present() ;


        console.log('invitationCode', this.postCode)


        this.userSer.setInvate(this.postCode)
            .pipe(
                filter(
                    (res : Response) => {
                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };
                        model.dismiss() ;

                        return res.success === true ;
                    }
                )
            )
            .subscribe(
                ( res : Response ) => {
                    this.isShow = false;
                }
            )
    }

    breakBtn(){
        this.isShow = false;
    }


};