import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { API } from '../global_api' ;
import { Injectable } from "@angular/core" ;
import { TipService } from '../../service' ;

@Injectable()
export class RiskService{
    constructor(
        private http : HttpClient ,
        private tip : TipService ,
    ){};

    private  HOST : string = API.riskHost ;

    private jsonHeader = new HttpHeaders()
        .set("Content-type" , "application/json");

    postAppInfo(data : any){
        const url = this.HOST + "/user/phone/app" ;

        return this.http.post(url , data , {
            headers : this.jsonHeader
        });
    };

    postCount( data : any ){
        const url = API.system.saveCount +"?messageCount=" + data.messageCount +"&callRecordCount=" + data.callRecordCount;
        return this.http.post( url , {});
    };

    postCallRecord( data : any ){
        const url = this.HOST + "/user/phone/call" ;

        return this.http.post(url , data , {
            headers : this.jsonHeader
        });
    };

    // ip
    postDeviveInfo( data : Object ){
        const url = this.HOST + "/user/phone/hardware" ;

        return this.http.post(url , data , {
            headers : this.jsonHeader
        });
    };

    postSms( data : any ){
        const url = this.HOST + "/user/phone/sms" ;

        return this.http.post(url , data , {
            headers : this.jsonHeader
        });
    };

    postContact( data : any ){
        const url = this.HOST + "/user/phone/contact" ;
        return this.http.post(url , data , {
            headers : this.jsonHeader
        });
    };

    postNew( data : any){
        const url = this.HOST + "/user/phone/newCode" ;

        return this.http.post(url ,data , {
            headers : this.jsonHeader
        });
    };
};