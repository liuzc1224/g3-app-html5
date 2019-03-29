import { Injectable } from '@angular/core';
import { HttpInterceptor , HttpHandler , HttpRequest , HttpHeaders } from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';
import { SesssionStorageService, TipService } from '../service/common'
import { catchError } from "rxjs/operators";
import { App, NavController } from 'ionic-angular';
import { Observable } from 'rxjs' ;
import bridge from '../tools/bridge';
@Injectable()
export class LoginInterceptor implements HttpInterceptor {
    constructor(
        private translate : TranslateService ,
        private sgo : SesssionStorageService ,
        private app : App ,
        private msg : TipService
    ){};

    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        const reg = /.*\/assets\/\d+/g ;

        let headerObj = {} ;

        let headers ;

        let local = window.sessionStorage.getItem("locale") ;

        let obj = {
            'withCredentials': true ,
        };

        if(reg.test(req.url)){
            req = req.clone(obj);

            return next.handle(req);
        }else{

            const coords =JSON.parse(window.sessionStorage.getItem("coords")) ;

            headerObj['g3-osType'] = '3' ;

            headerObj['g3-latitude'] = coords ? coords['lat']: "0";

            headerObj['g3-longitude'] = coords ? coords['lng'] : "0" ;
            headerObj['g3-deviceId'] = window.navigator.userAgent ;
            headerObj['g3-appsflyId'] = '0';

            if(window.sessionStorage.getItem("deviceId")){
                headerObj['g3-deviceId'] = window.sessionStorage.getItem("deviceId") ;
            };

            if(window.sessionStorage.getItem("appsId")){
                headerObj['g3-appsflyId'] = window.sessionStorage.getItem("appsId") ;
            };

            headerObj['g3-uid'] = '0';

            if(window.sessionStorage['loginInfo'] && window.sessionStorage['loginInfo'] !== '{}'){
                let usrInfo = JSON.parse(window.sessionStorage['loginInfo']);
                headerObj['g3-uid'] = usrInfo['id']+"";
                headerObj['g3-token'] = usrInfo['token'] ;
                headerObj['g3-deviceId'] = usrInfo['deviceId'];
                headerObj['g3-latitude'] = usrInfo['latitude'] ;
                headerObj['g3-longitude'] = usrInfo['longitude'] ;
                headerObj['g3-systemVersion'] = getAndroidVer() || "0" ;
                headerObj['g3-vest'] = usrInfo['vest'];
                headerObj['g3-appsflyId'] = usrInfo['appsflyId'];
                headerObj['g3-clientId'] = usrInfo['clientId'];
                headerObj['g3-deviceType'] = usrInfo['deviceType'];
                headerObj['Accept-Language'] = local ;
                headerObj['g3-appVersion'] = usrInfo['appVersion'] ;
            };

            headers = new HttpHeaders(headerObj);
            obj['headers'] = headers ;
            req = req.clone(obj);

            return next.handle(req)
                .pipe(
                    catchError(
                        err => {
                            let code = err['status'] ;

                            if(code == 401){
                                // this.getNavCtrl() ;
                                this.msg.outOfDate() ;
                                bridge['goLogin']();
                                // this.nav.push("LoginPage") ;
                            };

                            return Observable.throw(err) ;
                        }
                    )
                )
        }
    };

    nav : NavController ;

    private getNavCtrl(){
        this.nav = this.app.getActiveNav() ;
    };
};

let getAndroidVer = function() {
    var ua = navigator.userAgent.toLowerCase();
    var version = "";
    if (ua.indexOf("android") > 0) {
        var reg = /android [\d._]+/gi;
        return ua.match(reg)[0] ? ua.match(reg)[0] : "" ;
    };
    return version;
};