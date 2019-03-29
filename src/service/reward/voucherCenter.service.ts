import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { API } from '../global_api' ;
import { Injectable } from "@angular/core" ;
import { Observable } from 'rxjs';
import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class VoucherCenterService{
    constructor(
        private http : HttpClient
    ){};

    //获取领券中心列表
    getCenterReward(obj : object){
        let url = API.reward.getCenterReward ;
        let params = ObjToQuery(obj);
        return this.http.get(url, {
            params : params
        }) ;
    }

    postCenterReward(obj : object){
        let url = API.reward.postCenterReward ;
        let header = new HttpHeaders()
                        .set("Content-type" , "application/json");
        return this.http.post(url, obj, {
            headers: header
        }) ;
    }

};