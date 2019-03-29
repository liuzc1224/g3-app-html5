import { Storage } from './basic' ; 
import { Injectable } from '@angular/core' ;

@Injectable()
export class LocalStorageService extends Storage{
    constructor(){
        super(window.localStorage) ;
    }
};
