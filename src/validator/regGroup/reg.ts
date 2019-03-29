export const RegGroup = {
    passValid : ( val : string ) => {
        let reg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/ ;
        return reg.test(val) ;
    } ,
    cpfValid : ( val : string ) => {
        let reg = /\d{11}/g ;
        return reg.test(val) ;
    } ,
    mailValid : ( val : string ) => {
        let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g ;

        return reg.test(val) ;
    },
    idValid : (val : string ) => {
        let reg= /[a-zA-Z0-9]/g;
        return reg.test(val) ;
    } ,
    isNumber : (val : string) => {
        let reg = /^\d+$/g ;
        return reg.test(val) ;
    } ,
    invateCode : ( val : string) => {
        let reg= /^[a-zA-Z]{2}[a-zA-Z0-9]{4}/g;
        return reg.test(val) ;
    }
};

