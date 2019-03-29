import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { API } from '../global_api' ;
import { Injectable } from "@angular/core" ;
import { ObjToQuery } from "../ObjToQuery";
@Injectable()
export class AccountService{
    constructor(
        private http : HttpClient
    ){};

    hasPayPass(){
        const url = API.account.hasPayPass ;

        return this.http.get(url) ;
    };

    set( data : Object ){
        const url = API.account.setPass ;

        const header = new HttpHeaders()
            .set("Content-type" , "application/json") ;

        return this.http.patch(url , data , {
            headers : header
        });
    };
    bankList(){
        const url = API.account.bank.list ;

        return this.http.get(url) ;
    };

    support(){
        const url = API.account.bank.support ;

        return this.http.get(url) ;
    };

    update( data : Object ){
        const url = API.account.bank.update ;

        const header = new HttpHeaders()
            .set("Content-type" , "application/json") ;

        return this.http.put(url , data);
    };

    create(data : Object){
        const url = API.account.bank.create ;

        const header = new HttpHeaders()
            .set("Content-type" , "application/json");

        return this.http.post(url , data , {
            headers : header
        });
    };

    takeCash( data : Object , orderId : number ){
        const  url = API.account.cash + "/" + orderId;

        const  header = new HttpHeaders()
            .set("Content-type" , "application/json");

        return this.http.post(url , data , {
            headers : header
        });
    };

    takeCashInst( data : Object ){
        const  url = API.account.installment;

        const  header = new HttpHeaders()
            .set("Content-type" , "application/json");

        return this.http.post(url , data , {
            headers : header
        });
    };

    getContract(orderId : number  , data : Object ){
        const  url = API.account.contract + "/" + orderId ;
        let para = ObjToQuery(data) ;
        return this.http.get(url , {
            params : para
        });
    };

    changePass(data : Object){
        const  url = API.account.changePass ;
        const  header = new HttpHeaders()
            .set("Content-type" , "application/json");

        return this.http.patch(url , data , {
            headers : header
        });
    };

    changePayPass(data : Object){
        const  url = API.account.changePayPass ;
        const  header = new HttpHeaders()
            .set("Content-type" , "application/json");

        return this.http.patch(url , data , {
            headers : header
        })
    };
};