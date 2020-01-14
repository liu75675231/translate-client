import $ from "jquery";
import Translate from "./translate.js";

class Popup {
  constructor () {
    this.isInited = false;
    this.$dom = null;
    this.$loading = null;
    this.events = {
      selected: [],
    };
  }

  init () {
    const $dom = this.$dom = $(`<div id="tw-popup" class="tw-popup"><div class="tw-popup-loading">努力翻译中，请稍后~</div><div class="tw-popup-trans-list"></div></div>`);
    this.$loading = $dom.find(".tw-popup-loading");

    const _this = this;
    $dom.on("click", ".tw-popup-meaning-word", function (e) {
      _this.trigger("selected", {
        selected: e.target.innerHTML,
      });

      
      _this.hide();
//      hideTranslateTemplateHtml();
    });
    document.body.appendChild($dom.get(0));
  }

  on (type, callback) {
    this.events[type].push(callback);
  }

  trigger (type, data) {
    this.events[type].forEach(function (callback) {
      callback(data);
    });
  }

  hide () {
    this.$dom.css({
      display: "none",
    });
  }

  show (kwd, pos) {
    if (!this.isInited) {
      this.init();
    }

    const $dom = this.$dom,
      $loading = this.$loading;

    $loading.css({
      display: "block",
    });

    $dom.css({
      top: pos.top + "px",
      left: pos.left + "px",
      display: "block",
    });

    Translate.run(kwd, function (web, transData) {
      $loading.css({
        display: "none",
      });

      $dom.find(".tw-popup-trans-list").html(web.getPopupHtml(transData));
    });
  }
}
export default new Popup();