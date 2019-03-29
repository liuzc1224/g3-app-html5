import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LoadingService{
    constructor(
        private loadingSer : LoadingController ,
        private translate : TranslateService 
    ){

    };

    private lang : object ;

    private getLang : Function = () : Object => {
        if(this.lang){
            return this.lang;
        }else{
            return this.lang = JSON.parse(window.sessionStorage['lang']) ;
        };
    };

    private loadingModel : any ;

    deal(tip? : string){
        const lang = this.getLang() ; 

        return this.loadingSer.create({
            content: tip || lang['tip']['deal'] ,
            spinner : "dots"
        });
    };

    dealRisk(){
        const lang = this.getLang() ;

        return this.loadingSer.create({
            content: lang['tip']['deal']  ,
            spinner : "bubbles"
        });
    }
};