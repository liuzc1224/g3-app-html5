const recursiveCall = function(fncArr : Array< Function > , args){
    var arr = fncArr ;
    if(arr.length == 0){
        // arr[0].apply(this , args)
        //     .subscribe(
        //         res => {
        //             console.log(res) ;
        //         }
        //     )
    }else{
        try {
            arr[0].apply(this , args)
                .subscribe(
                    res => {
                        arr.shift() ;
                        if(res !== 'success'){
                            args.push(res) ;
                        };
                        recursiveCall.call(this , arr  , args) ;
                    }
                )
        }catch (e) {
            arr.shift() ;
            recursiveCall.call(this , arr  , args) ;
        };
    };
};

export function Before( fncName : string | Function ) : MethodDecorator {
    return function ( target : any, propertyKey : string, descriptor : PropertyDescriptor ) {
        let fnc = target[propertyKey] ;
        fnc['count'] = 0 ;
        !fnc.__beforeCache && ( fnc.__beforeCache = [] );

        let _args = arguments ;

        if(!fncName)
            return ;

        if(fncName instanceof  Function){
            fnc.__beforeCache.push(fncName)
        };
    };
};

export function After( fncName : string | Function ) : MethodDecorator {
    return function ( target : any, propertyKey : string, descriptor : PropertyDescriptor ) {
        let fnc = target[propertyKey] ;
        fnc['count'] = 0 ;
        !fnc.__afterCache && ( fnc.__afterCache = [] );

        let _args = arguments ;

        if(!fnc)
            return ;

        if(!fncName)
            return ;

        if(fncName instanceof  Function){
            fnc.__afterCache.push(fncName) ;
        };
    };
};

export function CombineAll() : MethodDecorator {
    return function ( target : any, propertyKey : string, descriptor : PropertyDescriptor ){

        let fnc = target[propertyKey] ;

        let raw = descriptor.value ;

        descriptor.value = function(...args){
            let beforeFn , afterFn , _arr = [] ;
            if(fnc['__beforeCache']){

                if(fnc['count'] == 0)
                    beforeFn = fnc['__beforeCache'].reverse() ;
                else
                    beforeFn = fnc['__beforeCache'] ;
                _arr = _arr.concat(beforeFn) ;
            };

            _arr.push(raw) ;

            if(fnc['__afterCache']){
                if(fnc['count'] == 0)
                    afterFn = fnc['__afterCache'].reverse() ;
                else
                    afterFn = fnc['__afterCache'] ;

                _arr = _arr.concat(afterFn);
            };

            fnc['count'] += 1 ;

            recursiveCall.call(this , _arr , args ) ;
        };
    };
};