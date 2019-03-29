import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { API } from '../global_api' ;
import { Injectable } from "@angular/core" ;
import { Observable } from 'rxjs';
import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class OrderService{
    constructor(
        private http : HttpClient
    ){};

    getLatest(){
        const url = API.order.latest ;

        return this.http.get(url) ;
    };

    create(data : Object){
        const url = API.order.create ;
        const header = new HttpHeaders()
            .set("Content-type" , "application/json") ;
        return this.http.post(url , data , {
            headers : header
        });
    };

    getRecord(data : Object){
        const url = API.order.history ;

        const para = ObjToQuery(data) ;
        return this.http.get(url, {
          params : para
        }) ;
    };
    //一次性借款
    pettyLoan( data: Object  ){
        const url = API.order.pettyLoan;
        const pram = ObjToQuery(data);

        return this.http.get(url, {
            params : pram
        }) ;
    };

    //分期借款
    installment( data: Object  ){
        const url = API.order.installment;
        const pram = ObjToQuery(data);

        return this.http.get(url, {
            params : pram
        }) ;
    };

    getDetail(orderId : number){
        const  url = API.order.detail + "/" + orderId ;
        return this.http.get(url) ;
    };

    getQrCode(orderNo : string){
        const url = API.order.getRepayId +"/" + orderNo;
        return this.http.get(url);
    };

    getContract( orderNo : string ){
        const  url = API.order.getContract + "/" + orderNo ;

        return this.http.get(url) ;
    };
    postEmail(data : Object,orderNo : string){
        const url = API.order.postEmail+ "/" + orderNo;
        const para = ObjToQuery(data) ;
        return this.http.get(url, {
            params : para
        });
    };   
    getHomePage( orderNo : string ){
        const  url = API.order.getHomePage + "/" + orderNo ;

        return this.http.get(url) ;
    };
    getRepaymentList( orderNo : string ){
        const  url = API.order.getRepaymentList + "/" + orderNo ;

        return this.http.get(url) ;
    };
    getStageOrderInfo( orderNo : string ){
        const  url = API.order.getStageOrderInfo + "/" + orderNo ;

        return this.http.get(url) ;
    };
};