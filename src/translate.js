import $ from "jquery";
import Bing from "./website-conf/bing.js";

class Translate {
  constructor () {
    const _this = this;
    this.webList = [
      Bing,
    ];
  }

  reqData (url) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: url,
        crossDomain: true,
        success: function (res) {
          resolve(res);
        },
      });
    });
  }

  run (kwd, callback) {
    const _this = this,
      list = [];
    this.webList.forEach(function (web) {
      _this.reqData(web.url + kwd).then(function (res) {
        const data = web.compile(res);
        callback(web, data);
      });
    });
  }
}

export default new Translate();