export class DateDeal{
    getNow( timeStamp : boolean = true , format : string = 'y-m-d h:i:s' ){
        let _stamp = Date.now() ;
        return timeStamp ? _stamp : this.format(_stamp , format) ;
    };

    format( dateStr : any  , format : string = 'y-m-d h:i:s' ){

        if(!dateStr)
            return null ;

        let isStamp = /^\d+$/g ;

        let _date = null ;

        let _arr = [] ;

        for(let code of format){
            _arr.push(code.toUpperCase()) ;
        };


        if(isStamp.test(dateStr)){
            _date = new Date() ;
            _date.setTime(Number(dateStr)) ;
        }else{
            _date = new Date(dateStr)
        };

        let dateObj = {
            Y : _date.getFullYear() ,
            M : DateDeal.fixZero(_date.getMonth() + 1) ,
            D :  DateDeal.fixZero(_date.getDate() ) ,
            H : DateDeal.fixZero(_date.getHours()) ,
            I : DateDeal.fixZero(_date.getMinutes()) ,
            S : DateDeal.fixZero(_date.getSeconds())
        };

        let __arr = [] ;

        _arr.forEach( (item) => {
            let val = dateObj[item] ;
            val ? __arr.push(val) : __arr.push(item) ;
        });

        return __arr.join("") ;

    };

    static  fixZero( str :any ){
        let reg =/^\d{1}$/;

        if(reg.test(str)){
            return "0" + str ;
        }else{
            return str ;
        };
    };

    getTimeZone(timeZone : any , format : string = 'y-m-d h:i:s' , timeStamp : any  = Date.now() ){

        if(timeZone)
            return null ;

        let date = new Date() ;

        let len = Number(timeStamp) ;

        let offset = date.getTimezoneOffset() * 60000 ;

        let utcTime = len + offset ;

        let raw = this.format(timeStamp , format) ;

        let _stamp = Number(utcTime) + Number(3600000) * Number(timeZone) ;

        let target = this.format( _stamp , format) ;

        return {
            raw : raw ,
            target : target
        };
    };
};