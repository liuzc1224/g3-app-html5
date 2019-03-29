export const splitStrByLen = (str : string , len : number = 1) => {
    const arr = [] ;
    if(str){
        let strLen = str.length ; 

        for(let i = 0 ; i < Math.ceil( strLen / len )  ; i ++ ){
            let strSplit = str.substr( i * len , len ) ; 
            arr.push(strSplit) ;
        };

        return arr
    }else{
        return arr ;
    };
};