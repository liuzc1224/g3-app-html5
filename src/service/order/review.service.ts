import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { API } from '../global_api' ;
import { Injectable } from "@angular/core" ;
import { Observable } from 'rxjs';
import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class ReviewService{
    constructor(
        private http : HttpClient
    ){};

    getCpf(){
        const url = API.review.cpf.get ;
        return this.http.get(url) ;
    };

    saveCpf(data : Object ){
        const url = API.review.cpf.save ;

        const header = new HttpHeaders()
            .set("Content-type" , "application/json") ;

        return this.http.put(url , data , {
            headers : header
        });
    };

    getAuth(){
        const url = API.review.auth ;

        return this.http.get(url);
    };

    saveAuth(data : FormData){
        const url = API.review.auth ;

        return this.http.post(url , data);
    };

    saveFace(data : FormData){
        const url = API.review.face ;

        return this.http.post(url , data);
    };

    getUserInfo(){
        const url = API.review.userInfo.get ;
        return this.http.get(url) ;
    };

    saveUserInfo(data : Object){
        const url = API.review.userInfo.save ;


        const header = new HttpHeaders()
            .set("Content-type" , "application/json") ;

        return this.http.put(url , data , {
            headers : header
        });
    };


    getWork(){
        const url = API.review.work ;
        return this.http.get(url) ;
    };

    saveWork(data : FormData){
        const url = API.review.work ;

        return this.http.post(url , data);
    };

    getContact(){
        const url = API.review.contact ;
        return this.http.get(url) ;
    };

    saveContact(data : FormData){
        const url = API.review.contact ;
        return this.http.post(url , data);
    };
};
