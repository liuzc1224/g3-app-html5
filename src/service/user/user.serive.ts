import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { API } from '../global_api' ;
import { Injectable } from "@angular/core" ;
import { ObjToQuery } from '../ObjToQuery' ;
@Injectable()
export class UserService{
    constructor(
        private http : HttpClient
    ){};

    uploadImg(formData : FormData){

        const url = API.user.headImgUpload ; 
        
        return this.http.post(url , formData);

    };

    login( data : Object ){
        const url = API.user.login ; 

        const header = new HttpHeaders()
            .set("Content-type" , "application/json") ;

        return this.http.post(url , data , {
            headers : header
        });
    };

    hasLogin(){
        let obj = window.sessionStorage['loginInfo'] ;
        return !!obj ;
    };

    regist(object : Object){
        const url = API.user.regist; 

        const header = new HttpHeaders()
            .set("Content-type" , "application/json");

        return this.http.post(url, object ,{
            headers : header
        });
    };

    postCode(data : Object){
        const url = API.user.postCode ; 
        
        const para = ObjToQuery(data) ;

        return this.http.get(url , {
            params : para
        });
    };

    logout(){
        const url = API.user.logout ; 
        return this.http.delete(url) ;
    };

    changePass( data : Object ){
        const url = API.user.changePass ;

        const header = new HttpHeaders()
            .set("Content-type" , "application/json");
        return this.http.patch(url , data , {
            headers : header
        });
    }

    forgetPass( data : Object){
        const url = API.user.fotgetPass ;

        const header = new HttpHeaders()
            .set("Content-type" , "application/json");

        return this.http.patch(url , data , {
            headers : header
        });
    };

    eixt( data : Object ){
        const url = API.user.userExit ;

        let para = ObjToQuery(data);

        return this.http.get(url , {
            params : para
        });
    };
    //设置邀请码
    setInvate( invitationCode : string ){
        const url = API.user.invitationCode + "?invitationCode=" + invitationCode;
        const header = new HttpHeaders()
            .set("Content-type", "application/json");

        return this.http.put(url , {}, {
            headers : header
        });
    }  

    //保存设备信息
    postDeviceDetail( data : Object ){
        const url = API.user.deviceDetail;
        const header = new HttpHeaders()
            .set("Content-type", "application/json");

        return this.http.post(url , data, {
            headers : header
        });
    }  
};