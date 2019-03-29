import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { API } from '../global_api' ;
import { Injectable } from "@angular/core" ;
import { TipService } from "../common";
@Injectable()
export class SystemService{
    constructor(
        private http : HttpClient ,
        private msg : TipService
    ){};


    helpList(){
        const url = API.system.help ;

        return this.http.get(url) ;
    };

    getFeedBackConfig(){
        const url = API.system.opinion.type ;

        return this.http.get(url) ;
    };

    postFeddBack(data : Object){
        const url = API.system.opinion.post;

        const header = new HttpHeaders()
            .set("Content-type" , "application/json") ;

        return this.http.post(url , data , {
            headers : header
        })
    };

    postLoanPurpose( data : Object){
        const url = API.system.saveLoanPurpose ;

        const header = new HttpHeaders()
            .set("Content-type" , "application/json") ;

        return this.http.post( url , data , {
            headers : header
        });
    };
    updateCheck(){
        const url = API.system.appUpdate ;
        return this.http.get(url) ;
    };
    getCouponPop(){
        const url = API.system.couponPop ;
        return this.http.get(url) ;
    }
    downLoadApk( data : Array<String> , fn : Function){
        // cordova.plugins.AppUpdate.coolMethod("downApk" , data , (data : string )  => {
        //     fn(data) ;
        // });
    };

};