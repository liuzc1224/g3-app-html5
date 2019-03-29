import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import bridge from '../../tools/bridge';

@Injectable()
export class ContactService{
    constructor(

    ){};

    private constsList :Array<object> = [] ;
    getContact(){
        if(!this.constsList.length){
            return new Observable(obsr => {
                bridge['getContact'](null, (res)=>{
                    let list = JSON.parse(res);
                    if (list.code === 2) {
                        console.log('请授权');
                    }
                    this.constsList = list.userPhoneContactDTOH5s;
                    console.log(this.constsList,'========');
                    obsr.next(this.constsList) ;
                })
            });
        }else{
            return new Observable( obsr => {
                obsr.next(this.constsList) ;
            })
        };
    };

    getContact_test(){
        return new Observable(obsr => {
            let arr = [
                {
                    contactName : "123" ,
                    contactPhone : [
                        '3128235'
                    ]
                },{
                    contactName : "asd" ,
                    contactPhone : [
                        '312123'
                    ]
                },{
                    contactName : "asd" ,
                    contactPhone : [
                        '312321412'
                    ]
                }
            ] ;
            obsr.next(arr) ;
        });
    };
};