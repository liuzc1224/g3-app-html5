import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { API } from '../global_api' ;
import { Injectable } from "@angular/core" ;
import { Observable } from 'rxjs';
import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class RewardService{
    constructor(
        private http : HttpClient
    ){};

    //获取选择优惠券列表
    chooseRewardList(param : object){
        const url = API.reward.chooseList;
        const parms = ObjToQuery(param);
        return this.http.get(url, {
            params : parms
        })
    }

    getMyReward(obj : object){
        let url = API.reward.myRewardList ;
        let params = ObjToQuery(obj) ;
        return this.http.get(url, {
            params : params
        }) ;
    }

};