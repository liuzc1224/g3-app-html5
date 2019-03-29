import { HttpClient } from '@angular/common/http' ;
import { API } from '../global_api' ;
import { Injectable } from "@angular/core" ;
import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class MsgService{
    constructor(
        private http : HttpClient
    ){};

    getMsgList( data : Object ){
        const url = API.msg.list ;
        const para = ObjToQuery(data) ;
        return this.http.get(url , {
            params : para
        }) ;
    };

    hasRead(){
        const  url = API.msg.setRead ;

        return this.http.patch(url , {}) ;
    };

    unRead(){
        const url = API.msg.unread ;
        return this.http.get(url) ;
    };
};
