export const ObjTool = {
    update : function(target : Object , data : Object){

        if(typeof data != "object")
            return target ;

        for(let keys in data){
            target[keys] = data[keys] ;
        };

        return target ;
    }
};