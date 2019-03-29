import { DateDeal } from './date.basic.class';

let dateDeal = new DateDeal() ;

export const dataFormat = ( timeStamp : any  , format : string = 'd/m/y') : string =>{
	if(timeStamp){
        return dateDeal.format(timeStamp , format) ;
	}else{
		return '' ;
	};
};

export const now = function(format : boolean = false){

	if(format){
		return dateDeal.getNow(false , 'd/m/y' );
	}else{
		return dateDeal.getNow(true) ;
	};
};

export const daysLater = ( day : any ) => {
	const reg = /\d+/g ;

	if(reg.test(day)){
		let sec = day * 24 * 60 * 60 * 1000 ;

		let nowStamp = Number(now()) + sec ;

		return nowStamp ;
	}else{
		return day ;
	};
};

export const dataFormatRegular = ( timeStamp : any  , format : string = 'y-m-d h:i:s') : string =>{
    if(timeStamp && timeStamp !== 'null'){
        return dateDeal.format(timeStamp , 'y-m-d') ;
    }else{
        return '' ;
    };
};

