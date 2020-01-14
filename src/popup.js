import $ from "jquery";
import Translate from "./translate.js"
class Popup {
  constructor () {
    this.isInited = false;
    this.$dom = null;
    this.$loading = null;
  }

  init () {
    const $dom = this.$dom = $(`<div id="tw-popup" class="tw-popup"><div class="tw-popup-loading">努力翻译中，请稍后~</div><div class="tw-popup-trans-list"></div></div>`);
    this.$loading = $dom.find(".tw-popup-loading");

    $dom.on("click", ".tw-popup-meaning-word", function (e) {
      const chineseText = e.target.innerHTML;
      console.log(chineseText);
//      addToStorage();
//      hideTranslateTemplateHtml();
    });
    document.body.appendChild($dom.get(0));
  }

  hide () {

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

    Translate.run(kwd, function (web, data) {
      $loading.css({
        display: "none",
      });

      $dom.find(".tw-popup-trans-list").html(web.getPopupHtml(data));
    });
  }
}
export default new Popup();