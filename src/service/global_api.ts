import { ENV } from "@app/env";
// const host = 'http://-pre' ;
// const host = 'http://10.0.52.103:8300' ;
// const host = 'http://localhost:3001' ;
// const host = 'http://192.168.24.100:9002' ;
const host = ENV.host;
export const API = {
  host: host,
  riskHost: ENV.riskHost,
  loan: {
    purpose: host + "/system/borrow/purpose",
    feedback: host + "/system/opinion"
  },
  user: {
    headImgUpload: host + "/user/info/head/portrait",
    login: host + "/user/login",
    regist: host + "/user/register",
    postCode: host + "/verification/code",
    logout: host + "/user/logout",
    changePass: host + "/user/login/password/update",
    fotgetPass: host + "/user/login/password/forget",
    userExit: host + "/user/register/check",
    invitationCode: host + "/user/register/invitationCode",
    deviceDetail: host + "/user/device/detail"
  },
  account: {
    hasPayPass: host + "/account/payment/password/exist",
    setPass: host + "/account/payment/password/set",
    bank: {
      list: host + "/bank/personal",
      support: host + "/bank/support",
      update: host + "/bank",
      create: host + "/bank/binding"
    },
    cash: host + "/account/confirmCash",
    installment: host + "/withdrawDeposit/v2/installment",
    changePass: host + "/account/payment/password/update",
    changePayPass: host + "/account/payment/password/forget",
    contract: host + "/account/cash"
  },
  order: {
    latest: host + "/order/user",
    create: host + "/creditOrder/create",
    history: host + "/order/record",
    plan: host + "/repayment/currentRepay",
    pettyLoan: host + "/withdrawDeposit/v2/pettyLoan",
    installment: host + "/withdrawDeposit/v2/installment",
    detail: host + "/order/detail",
    getRepayId: host + "/repayment/currentRepay/boleto",
    getContract: host + "/repayment/pact",
    postEmail: host + "/repayment/currentRepay/boletoEmailSend",
    getRepaymentList: host + "/repayment/currentRepay/stagesRepeyDetail",
    getHomePage: host + "/repayment/currentRepay/stagesHomePage",
    getStageOrderInfo: host + "/repayment/currentRepay/settleRepayDetail"
  },
  review: {
    cpf: {
      get: host + "/user/info/getCpfByUid",
      save: host + "/user/info/cpf"
    },
    auth: host + "/user/authentication",
    face: host + "/user/face/saveImg",
    userInfo: {
      get: host + "/user/info/getDetail",
      save: host + "/user/info"
    },
    work: host + "/user/work",
    contact: host + "/user/contact"
  },
  msg: {
    list: host + "/message/history",
    setRead: host + "message/read",
    unread: host + "/message/unread"
  },
  system: {
    help: host + "/system/help/center",
    opinion: {
      type: host + "/system/opinion/config",
      post: host + "/system/opinion"
    },
    saveLoanPurpose: host + "/system/borrow/purposelog",
    appUpdate: host + "/system/apkVersion",
    saveCount: host + "/user/callrecord/count",
    couponPop: host + "/coupon/frame"
  },
  reward: {
    chooseList: host + "/coupon/chooseCoupon",
    myRewardList: host + "/coupon/getCoupons", //我的优惠券列表
    getCenterReward: host + "/coupon/couponCenter", //领券中心列表
    postCenterReward: host + "/coupon/activateCoupon" //领取优惠券
  }
};
export const APP_VERSION = "1.1.1";

if (ENV.env === "debug") {
  console.log(
    `%c版本号 : ${APP_VERSION} `,
    "background:#000 ;color:#bada55;font-size:16px"
  );
  console.log(
    `%c环境 : ${ENV.env} `,
    "background:#000 ;color:#bada55;font-size:16px"
  );
  console.log(
    `%c接口地址: ${ENV.host} `,
    "background:#000 ;color:#bada55;font-size:16px"
  );
}
