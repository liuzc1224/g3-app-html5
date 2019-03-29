import { Component , OnInit } from '@angular/core';
import { LoanService, SesssionStorageService, TipService, UserActionService } from '../../../service';
import { filter } from 'rxjs/operators';
import { Response } from '../../../share/model' ;
import { IonicPage , NavController } from "ionic-angular";
import { Before, CombineAll } from "../../../decorators/function.decorator";
import { Observable } from "rxjs";
import { now } from "../../../tools";
import bridge from '../../../tools/bridge';
@IonicPage({
    name : "LoanPurposePage"
})
@Component({
    selector: 'loan-purpose',
    templateUrl: 'loan-purpose.html'
})
export class LoanPurposeComponent implements OnInit {
    parent = this;
    constructor(
        private loan : LoanService ,
        private msg : TipService ,
        private nav : NavController ,
        private sgo : SesssionStorageService ,
        private userAction : UserActionService
    ){};

    showLoading : boolean = true ;

    ngOnInit(){
        this.getPurpose() ;

        (function(){
            if(typeof FormData.prototype.get == "undefined"){
                console.log("Formdata.prototype.get is not exist on this device ") ;
                var append = FormData.prototype.append ;
                FormData.prototype.append = function(name , key){
                    // console.log("custom formdata append invoke") ;
                    if(!this['_cache'])
                        this['_cache'] = {} ;
                    this['_cache']['name'] = key ;
                    append.apply(this , [name , key]) ;
                };

                FormData.prototype.get = function(name){
                    // console.log("custom formdata get invoke") ;
                    console.log(this, 'FormData.prototype.get')
                    if(this['_cache']){
                        console.log(this['_cache'],'_cache')
                        return this['_cache'][name] ? this['_cache'][name] : null ;
                    }else{
                        return null ;
                    }
                };
            }else{
                console.log("FormData.prototype.get exist") ;
            };
        })();

    };

    enum_purpose : Array< Object > ;

    getPurpose(){
        this.loan.getPurpose()
            .pipe(
                filter(
                    ( res : Response ) => {
                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };
                        this.showLoading = false ;

                        return res.success === true &&  ( <Array< Object > >res.data).length > 0;
                    }
                )
            )
            .subscribe(
                ( res : Response ) => {

                    this.enum_purpose = ( <Array< Object > >res.data) ;

                    this.select = res.data[0] ;
                }
            );
    };

    select : { id : number , description : string } ;

    // 风控数据
    @Before(function(){
        let model = this.loadCtr.dealRisk() ;

        model.present() ;

        return new Observable( obsr => {

            let name = this.select['description'] ;

            let purposeId = this.select['id'] ;

            let data = {
                description : name ,
                purposeId : purposeId
            };
            this.sysSer.postLoanPurpose(data)
                .pipe(
                    filter(
                        ( res : Response ) => {

                            if(res.success === false){
                                this.msg.operateFail(res.message) ;
                            };

                            model.dismiss() ;

                            return res.success === true  ;
                        }
                    )
                )
                .subscribe(
                    (res : Response ) => {
                        obsr.next("success") ;
                    }
                );
        });
    })
    @CombineAll()
    nextBtn(){
        this.riskTime['nextStep'] += now();
        this.userAction.loanPurpose(this.riskTime)
        return new Observable( obsr => {
            let id = this.select.id ;

            this.sgo.set("loanPurpose" , id ) ;

            this.nav.push("CpfPage") ;
        })
    };

    selectItem(item){
        this.select = item ;
        this.makeRecord('shop') ;
    };

    back(par){
        // par.nav.pop() ;
        par.makeRecord('topBack') ;
        par.userAction.loanPurpose(par.riskTime) ;
        bridge['goBack']();
    };

    riskTime = {
        "nextStep": "",
        "step": "",
        "stepId": "" ,
        "topBack": "" ,
        "shop": ""
    };

    makeRecord( name:string){
        if (name === 'step') {
            this.riskTime['stepId'] = "0";
        }
        this.riskTime[name] += now() + ","
    };
};