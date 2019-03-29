import { Component, OnInit } from '@angular/core';
import { LoadingService, ReviewService, TipService, UserActionService } from '../../../service';
import { filter } from 'rxjs/operators';
import { Response } from '../../../share/model';
import { now, splitStrByLen } from '../../../tools';
import { IonicPage, NavController } from 'ionic-angular';
import { RegGroup } from '../../../validator/regGroup/reg';

@IonicPage({
    name : "CpfPage"
})
@Component({
    selector: 'cpf',
    templateUrl: 'cpf.html'
})
export class CpfComponent implements OnInit {
    parent = this;
    constructor(
        private reviewSer : ReviewService ,
        private msg : TipService ,
        private loading : LoadingService ,
        private nav : NavController ,
        private userAction : UserActionService
    ) {
    } ;

    ngOnInit(){
        this.getCpf() ;
    };

    first : boolean = true ;

    access(){
        this.first = !this.first ;
        this.makeRecord('cpfAuth') ;
    };
    status : boolean = false ;

    inputCpf : Array<string> = [null , null , null , null] ;

    resMark : boolean = false ;

    inputEntity : string = '' ;

    nextBtn($event){
        this.makeRecord('nextStep');
        this.userAction.cpf(this.riskObj);
        const str = this.inputEntity ;

        if(!RegGroup.cpfValid(str)){
            this.msg.require() ;
            return ;
        };

        let el = <HTMLButtonElement>$event.target ;

        el.disabled = true ;

        if(this.first === false ){
            this.msg.require() ;
            return ;
        };

        let model = this.loading.deal() ;

        model.present() ;

        let postData = {
            cpf : str
        } ;

        this.reviewSer.saveCpf(postData)
            .pipe(
                filter(
                    (res : Response) => {
                        if(res.success === false){
                            this.msg.operateFail(res.message) ;
                        };

                        model.dismiss() ;

                        el.disabled = false ;

                        return res.success === true ;
                    }
                )
            )
            .subscribe(
                (res : Response) => {
                    this.slideTo("UserAuthPage")
                }
            );
    };


    getCpf(){
        this.reviewSer.getCpf()
            .pipe(
                filter(
                    ( res : Response ) => {
                        if(res.success === false ){
                            this.msg.operateFail(res.message) ;
                        }
                        return res.success === true ;
                    }
                )
            )
            .subscribe(
                res => {

                    this.resMark = true ;


                    let cpf = res.data['cpf'] ;

                    this.inputCpf = splitStrByLen(cpf , 3) ;

                    this.inputEntity = res.data['cpf'] ;

                    this.status = !res.data['cpfEditStatus'] ;

                }
            )
    };

    slideTo(name , step?){

        if(step !== false)
            this.riskObj['stepId'] = step;
            this.makeRecord('step');
            this.userAction.cpf(this.riskObj);

        if(name)
            this.nav.push(name);


    };

    back(par){
        par.makeRecord('topBack');
        par.userAction.cpf(par.riskObj);
        par['nav'].pop() ;
    };

    transoToArr($event){
        let tar = <HTMLInputElement>$event.target ;
        let value = tar.value ;
        this.inputCpf = splitStrByLen( value , 3 ) ;
    };
    riskObj = {
        "cpfAuth": "",
        "cpfEdit": "",
        "step": "",
        "stepId": "",
        "nextStep": "",
        "topBack": ""
    };

    makeRecord( name){
        this.riskObj[name] += (now() + ",");
    };
};