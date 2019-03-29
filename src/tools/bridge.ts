var clientType, isAppClient;
var cookie = document.cookie;
var ua = window.navigator.userAgent.toLowerCase();
var Bridge = {};

if (ua.match(/ua_ps_ios/i) || cookie.match(/PSClient=ios/i)) {
  clientType = "ios";
  isAppClient = true;
} else if (ua.match(/ua_ps_android/i) || cookie.match(/PSClient=android/i)) {
  clientType = "android";
  isAppClient = true;
} else {
  clientType = "browser";
  isAppClient = false;
}

function setupWebViewJavascriptBridge(callback) {
  //Android使用
  if (window["WebViewJavascriptBridge"]) {
    return callback(window["WebViewJavascriptBridge"]);
  } else {
    document.addEventListener(
      "WebViewJavascriptBridgeReady",
      function() {
        callback(window["WebViewJavascriptBridge"]);
      },
      false
    );
  }
  if (window["WVJBCallbacks"]) {
    return window["WVJBCallbacks"].push(callback);
  }
  window["WVJBCallbacks"] = [callback];
  var WVJBIframe = document.createElement("iframe");
  WVJBIframe.style.display = "none";
  WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

function commonCallHandler(action, data, callBack) {
  setupWebViewJavascriptBridge(function(bridge) {
    bridge.callHandler(action, JSON.stringify(data), callBack);
  });
}

//注册回调方法
// function commonRegisterHandler(action, callBack) {
//   setupWebViewJavascriptBridge(function (bridge) {
//     bridge.registerHandler(action, function (data, responseCallback) {
//       window[action](data)
//       callBack(data)
//       responseCallback("success")
//     })
//   })
// }

//去登录
Bridge["goLogin"] = function(data = {}, callBack) {
  if (!isAppClient) {
    window.location.href = "/#/login";
  } else {
    commonCallHandler("goLogin", data, callBack);
  }
};

//获取用户登录信息
Bridge["getUserLoginInfo"] = function(data = {}) {
  return new Promise((resolve, reject) => {
    let callBack = data => {
      window.sessionStorage.setItem("loginInfo", data);
      resolve(true);
    };
    commonCallHandler("getUserLoginInfo", data, callBack);
    if (!isAppClient) {
      // callBack('{}')204
      callBack('{"appVersion":"2.0.0","appsflyId":"1545270775890-1978421542311634016","areaCode":"55","birthday":"1545062400000","birthplace":"CE","block":"124676999","city":"123457890","clientId":"39a13aa80b9958123bedf19da872387d","cpf":"12341222256","createTime":"1544414112000","currentResidential":"124676999","deviceId":"b75431ed035c491089f84b5517c26f47","deviceType":"SM-J701MT","educationBackground":3,"email":"123456@qq.com","gender":2,"id":343,"latitude":"30.338961","loanPurpose":0,"longitude":"120.1089447","maritalStatus":3,"modifyTime":"1545212564000","phoneNumber":"12345678902","residentialDuration":2,"residentialPostcode":"21234567","state":"DF","token":"a788604a-8495-4ef7-801c-298779cc74b5","vest":"1"}')
    }
  })
}

//返回上一页
Bridge["goBack"] = function(data = {}, callBack) {
  commonCallHandler("goBack", data, callBack);
};

//打开相机
Bridge["openCamera"] = function(data = {}, callBack) {
  commonCallHandler("openCamera", data, callBack);
};
//打开相册
Bridge["openGallary"] = function(data = {}, callBack) {
  commonCallHandler("openGallary", data, callBack);
};

//跳转主页
Bridge["goHome"] = function(data = {}, callBack) {
  commonCallHandler("goHome", data, callBack);
};

//跳转忘记密码页面
Bridge["forgetLoginPw"] = function(data = {}, callBack) {
  commonCallHandler("forgetLoginPw", data, callBack);
};

//获取通讯录
Bridge["getContact"] = function(data = {}, callBack) {
  commonCallHandler("getContact", data, callBack);
};

//获取风控信息
Bridge["getDviceDetail"] = function(data = {}, callBack) {
  commonCallHandler("getDviceDetail", data, callBack);
};
//获取风控信息
Bridge["InstalledApp"] = function(data = {}, callBack) {
  commonCallHandler("InstalledApp", data, callBack);
};
//获取风控信息
Bridge["contactMess"] = function(data = {}, callBack) {
  commonCallHandler("contactMess", data, callBack);
};
//获取风控信息
Bridge["getHardwareMess"] = function(data = {}, callBack) {
  commonCallHandler("getHardwareMess", data, callBack);
};
//获取风控信息
Bridge["getCall"] = function(data = {}, callBack) {
  commonCallHandler("getCall", data, callBack);
};
//获取风控信息
Bridge["getSms"] = function(data = {}, callBack) {
  commonCallHandler("getSms", data, callBack);
};
//获取风控信息
Bridge["getNewCode"] = function(data = {}, callBack) {
  commonCallHandler("getNewCode", data, callBack);
};
//获取风控信息
Bridge["getCount"] = function(data = {}, callBack) {
  commonCallHandler("getCount", data, callBack);
};
//获取人脸识别
Bridge["uploadfaceNow"] = function(data = {}, callBack) {
  commonCallHandler("uploadfaceNow", data, callBack);
};
//复制
Bridge["copy"] = function(data = " ", callBack) {
  commonCallHandler("copy", data, callBack);
};

export default {
  clientType: clientType,
  isAppClient: isAppClient,
  ...Bridge
};
