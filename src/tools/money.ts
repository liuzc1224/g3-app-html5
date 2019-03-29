export const money = function( money : number | string ){

	if(money){
        let strMon = money + '' ;
        strMon = strMon.replace('.','>') ;
        strMon = strMon.replace(',','.') ;
        strMon = strMon.replace('>',',') ;

        return strMon ;
	}else{
        return '0.00' ;
	};
};