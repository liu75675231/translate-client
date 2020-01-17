import $ from "jquery";
import Bing from "./website-conf/bing.js";

class Translate {
  constructor () {
    const _this = this;
    this.webList = [
      Bing,
    ];
    this.env = "prod";
  }

  setEnv (env) {
    this.env = env;
  }

  reqData (data) {
    var _this = this;
    return new Promise(function (resolve, reject) {
      if (_this.env === "prod") {
        chrome.runtime.sendMessage({
          action: "ajaxTrans",
          type: "bing",
          text: data,
        }, function (res) {
          resolve(res.data);
        });
      } else {
        $.ajax({
          url: data,
          crossDomain: true,
          success: function (res) {
            resolve(res);
          },
        });
      }
    });  
  }

  run (kwd, callback) {
    const _this = this,
      list = [];
    
    this.webList.forEach(function (web) {
      var params = _this.env === "prod" ? kwd : web.url + kwd;
      _this.reqData(params).then(function (res) {
        const data = web.compile(res);
        callback(web, data);
      });
    });
  }
}

var transObj = new Translate();
console.log("aaa");
export default transObj;