export default {
    getUrlParams(url? : string) {
        var _url = url || window.location.href;
        var index = _url.indexOf('?');
        var params = {};
        var reg = /\?/g;
        if (_url.match(reg)) {
            var question_mark_count = _url.match(reg).length; //url中的问号数量
            if (question_mark_count > 1) {
                index = _url.lastIndexOf('?');
            }
        }
        if (index !== -1) {
            var paramsStr = _url.slice(index + 1); // 获取到问号以后的字符串
            var paramsArr = paramsStr.split('&');
            // 把url上的所有参数塞到json对象中,以键值对的方式保存
            for (var i = 0, length = paramsArr.length, param; i < length; i++) {
                param = paramsArr[i].split('=');
                params[param[0]] = param[1]
            }
        }
        return params;
    }
}