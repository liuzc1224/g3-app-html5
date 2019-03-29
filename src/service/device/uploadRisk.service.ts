import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import bridge from '../../tools/bridge';

@Injectable()
export class UploadRisk {

    constructor(
    ) { };

    riskInfo() {

        return new Observable(resove => {
            let errFlag = true;

            let getDviceDetail = new Promise(function(resolve, reject){
                bridge['getDviceDetail'](null, (res) => {
                    let obj = JSON.parse(res);
                    console.log('getDviceDetailCode',obj.code);
                    if (obj.code === 0) {
                        resolve(obj)
                    }else{
                        reject('failed')
                    }
                });
            }).catch(function(reason) {
                if (errFlag) {
                    resove.next(reason)
                    errFlag = false;
                    console.log('getDviceDetailcatch:', reason);
                }
            });
            let InstalledApp = new Promise(function(resolve, reject){
                bridge['InstalledApp'](null, (res) => {
                    let obj = JSON.parse(res);
                    console.log('InstalledApp',obj.code);
                    if (obj.code === 0) {
                        resolve(obj)
                    }else{
                        reject('failed')
                    }
                });
            }).catch(function(reason) {
                if (errFlag) {
                    resove.next(reason)
                    errFlag = false;
                    console.log('InstalledAppcatch:', reason);
                }
            });
            let contactMess = new Promise(function(resolve, reject){
                bridge['contactMess'](null, (res) => {
                    let obj = JSON.parse(res);
                    console.log('contactMess',obj.code);
                    if (obj.code === 0) {
                        resolve(obj)
                    }else{
                        reject('failed')
                    }
                });
            }).catch(function(reason) {
                if (errFlag) {
                    resove.next(reason)
                    errFlag = false;
                    console.log('contactMesscatch:', reason);
                }
            });
            let getHardwareMess = new Promise(function(resolve, reject){
                bridge['getHardwareMess'](null, (res) => {
                    let obj = JSON.parse(res);
                    console.log('getHardwareMess',obj.code);
                    if (obj.code === 0) {
                        resolve(obj)
                    }else{
                        reject('failed')
                    }
                });
            }).catch(function(reason) {
                if (errFlag) {
                    resove.next(reason)
                    errFlag = false;
                    console.log('getHardwareMesscatch:', reason);
                }
            });
            let getCall = new Promise(function(resolve, reject){
                bridge['getCall'](null, (res) => {
                    let obj = JSON.parse(res);
                    console.log('getCall',obj.code);
                    if (obj.code === 0) {
                        resolve(obj)
                    }else{
                        reject('failed')
                    }
                });
            }).catch(function(reason) {
                if (errFlag) {
                    resove.next(reason)
                    errFlag = false;
                    console.log('getCallcatch:', reason);
                }
            });
            let getSms = new Promise(function(resolve, reject){
                bridge['getSms'](null, (res) => {
                    let obj = JSON.parse(res);
                    console.log('getSms',obj.code);
                    if (obj.code === 0) {
                        resolve(obj)
                    }else{
                        reject('failed')
                    }
                });
            }).catch(function(reason) {
                if (errFlag) {
                    resove.next(reason)
                    errFlag = false;
                    console.log('getSmscatch:', reason);
                }
            });
            let getNewCode = new Promise(function(resolve, reject){
                bridge['getNewCode'](null, (res) => {
                    let obj = JSON.parse(res);
                    console.log('getNewCode',obj.code);
                    if (obj.code === 0) {
                        resolve(obj)
                    }else{
                        reject('failed')
                    }
                });
            }).catch(function(reason) {
                if (errFlag) {
                    resove.next(reason)
                    errFlag = false;
                    console.log('getNewCodecatch:', reason);
                }
            });
            let getCount = new Promise(function(resolve, reject){
                bridge['getCount'](null, (res) => {
                    let obj = JSON.parse(res);
                    console.log('getCount',obj.code);
                    if (obj.code === 0) {
                        resolve(obj)
                    }else{
                        reject('failed')
                    }
                });
            }).catch(function(reason) {
                if (errFlag) {
                    resove.next(reason)
                    errFlag = false;
                    console.log('getCountcatch:', reason);
                }
            });



            Promise.all([getDviceDetail, InstalledApp, contactMess, getHardwareMess, getCall, getSms, getNewCode, getCount]).then(function(res){
                let flag = res.filter((res)=>{
                    return res === undefined
                })
                if (flag.length === 0) {
                    //成功
                    resove.next({code:0})
                }
            }).catch(function(reason) {
                console.log('allcatch:', reason);
            });
        })
    };

};