export default {
  type: "bing",
  url:
    "/bing/dict/clientsearch?mkt=zh-CN&setLang=zh&form=BDVEHC&ClientVer=BDDTV3.5.1.4320&q=",
  compile: function(html) {
    var doc = new DOMParser().parseFromString(html, "text/html");

    var data = {
      title: "",
      pronList: [],
      meaningList: []
    };

    data.title = doc.querySelector(".client_def_hd_hd").innerHTML;

    const pinyinList = doc.querySelectorAll(".client_def_hd_pn");
    pinyinList.forEach(elem => {
      data.pronList.push(elem.innerHTML);
    });

    const meaningList = doc
      .querySelector(".client_def_container")
      .querySelectorAll(".client_def_bar");
    meaningList.forEach(meaning => {
      const clientDefTitle = meaning.querySelector(".client_def_title");
      if (clientDefTitle) {
        data.meaningList.push({
          type: clientDefTitle.innerHTML,
          wordList: meaning
            .querySelector(".client_def_list_word_bar")
            .innerHTML.split("；")
        });
      }
    });
    return data;
  },
  getPopupHtml: function(data) {
    const pornStrList = [];
    data.pronList.forEach(function(elem) {
      pornStrList.push(`<div class="tw-popup-pron-item">${elem}</div>`);
    });

    const meaningStrList = [];
    data.meaningList.forEach(function(meaning) {
      const wordStrList = [];
      meaning.wordList.forEach(function(word) {
        wordStrList.push(`<div class="tw-popup-meaning-word">${word}</div>`);
      });
      meaningStrList.push(`
                <div class="tw-popup-meaning-item">
                    <div class="tw-popup-meaning-type">${meaning.type}</div>
                    <div class="tw-popup-meaning-word-list">${wordStrList.join(
                      ""
                    )}</div>
                </div>
            `);
    });
    let template = `
            <div class="tw-popup-trans-item">
                <div class="tw-popup-title">${data.title}</div>
                <div class="tw-popup-pron-list">${pornStrList.join("")}</div>
                <div class="tw-popup-meaning-list">
                    ${meaningStrList.join("")}
                </div>
            </div>`;
    return template;
  }
};
