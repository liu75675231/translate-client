import $ from "jquery";
import css from "../../chrome/style/index.css";
import CssSelectorGenerator from "css-selector-generator";
import Popup from "../../../src/popup.js";
import { addToStorage } from "../../../src/storage.js";

const selectorGenerator = new CssSelectorGenerator();
let text = '';
let pos = {
    top: 0,
    left: 0,
}
var className = '';
var chineseText = '';
var selectedFunc = undefined;
Popup.on("selected", function (data) {
    selectedFunc(data.selected);
});

function selectedHandler (text, className) {
    return function (selected) {
        addToStorage({
            text: text,
            className: className,
            chineseText: selected,
      });
    }
}

document.addEventListener('mouseup', function (e) {
    if (e.target.id === 'im1') {
        return;
    }
    const selected = getSelectedText();
    if (selected.text ) {
        className = selectorGenerator.getSelector(e.target);
        pos = {
            left: e.pageX,
            top: e.pageY,
        }
        showImg(pos);
    } else {
        hideImg();
    }
    text = selected.text;
    hideTranslateTemplateHtml();
});
function showImg (pos) {
    let img = document.getElementById('im1');
    if (!img) {
        img = document.createElement('img');
        img.src = 'https://shuati-images.oss-cn-beijing.aliyuncs.com/images/logo32.png';
        img.id = 'im1';
        document.body.appendChild(img);
        img.addEventListener('click', function (e) {
            hideImg();
            e.stopPropagation();
            if (text) {
//                showTranslageTemplateHtml(text);
                Popup.show(text, {
                  top: pos.top,
                  left: pos.left + 30,
                });
                selectedFunc = selectedHandler(text, className);
                clearSelect();
                hideImg();
            }
        });
    }
    img.style = 'position: absolute; top: ' + pos.top + 'px; left: ' + pos.left + 'px;';
}
function hideImg () {
    let img = document.getElementById('im1');
    if (img) {
        img.style = 'display: none;';
    }
}
function getSelectedText () {
    if (window.getSelection) {  // all browsers, except IE before version 9
        var range = window.getSelection ();
        return {
            text: range.toString (),
            pos: range.getRangeAt(0).getBoundingClientRect()
        };
    }
}

function clearSelect () {
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection) {  // IE?
        document.selection.empty();
      }
}
function showTranslageTemplateHtml(text) {
    let doc = document.getElementById('tw-popup');
    if (!doc) {
        const frag = document.createDocumentFragment();
        doc = document.createElement('div');
        doc.id = 'tw-popup';
        frag.appendChild(doc);
        document.body.appendChild(frag);
        doc.addEventListener('mouseup', function (e) {
            e.stopPropagation();
        });
        $(doc).on("click", ".tw-popup-meaning-word", function (e) {
            chineseText = e.target.innerHTML;
            addToStorage();
            hideTranslateTemplateHtml();
        })

    }

    doc.style = `top: ${ pos.top }px; left: ${ pos.left }px`;
    ajaxForBing(text, function (data) {

        const pornStrList = [];
        data.pronList.forEach(function (elem) {
            pornStrList.push(`<div class="tw-popup-pron-item">${ elem }</div>`);
        });

        const meaningStrList = [];
        data.meaningList.forEach(function (meaning) {
            const wordStrList = [];
            meaning.wordList.forEach(function (word) {
                wordStrList.push(`<div class="tw-popup-meaning-word">${ word }</div>`);
            });
            meaningStrList.push(`
                <div class="tw-popup-meaning-item">
                    <div class="tw-popup-meaning-type">${ meaning.type }</div>
                    <div class="tw-popup-meaning-word-list">${ wordStrList.join('') }</div>
                </div>
            `);
        });
        let template = `
            <div class="tw-popup">
                <div class="tw-popup-title">${ data.title }</div>
                <div class="tw-popup-pron-list">${ pornStrList.join('') }</div>
                <div class="tw-popup-meaning-list">
                    ${ meaningStrList.join('') }
                </div>
            </div>`;


        doc.innerHTML = template;
    });
}

// function addToStorage () {
//     let originDataStr = localStorage.getItem('trans-data'),
//         list = [];
//     if (originDataStr) {
//         list = JSON.parse(originDataStr);
//     }
//     var data = {
//         text: text,
//         selector: className,
//         targetText: chineseText,
//     }
//     list.push(data);
//     localStorage.setItem("trans-data", JSON.stringify(list))
//     resetStorageDataToHtml(data);
// }

function hideTranslateTemplateHtml() {
    const dom = document.getElementById('tw-popup');
    if (dom) {
        dom.style = 'display: none;';
    }
}

function ajaxForDev (callback) {
  $.ajax({
    url: "/bing/dict/clientsearch?mkt=zh-CN&setLang=zh&form=BDVEHC&ClientVer=BDDTV3.5.1.4320&q=english",
    crossDomain: true,
    success: function (res) {
      console.log(res);
      callback && callback(res);
    },
  });
}



function ajaxForBing (text, callback) {
  ajaxForDev(function (data) {
      var doc = new DOMParser().parseFromString(data, "text/html");
      var data = {
          title: '',
          pronList: [],
          meaningList: [],
      };
      data.title = doc.querySelector('.client_def_hd_hd').innerHTML;

      const pinyinList = doc.querySelectorAll('.client_def_hd_pn');
      pinyinList.forEach((elem) => {
          data.pronList.push(elem.innerHTML);
      });

      const meaningList = doc.querySelector ('.client_def_container').querySelectorAll('.client_def_bar');
      meaningList.forEach((meaning) => {
          const clientDefTitle = meaning.querySelector('.client_def_title');
          if (clientDefTitle) {
              data.meaningList.push({
                  type: clientDefTitle.innerHTML,
                  wordList: meaning.querySelector('.client_def_list_word_bar').innerHTML.split('；'),
              });
          }
      });
      callback(data);
  });
    
}

resetStorageDataToHtml();

function resetStorageDataToHtml (data) {
    if (data) {
        insertToHtml(data);
    } else {
        let list = localStorage.getItem('trans-data', 'data');
        if (list) {
            list = list && JSON.parse(list);
            list.forEach(function (elem) {
                insertToHtml(elem);
            });
        }
    }
}
function insertToHtml (data) {
    var $selector = $(data.selector);
    if ($selector.length > 0) {
        var html = $selector.html();
        html = html.replace(data.text, data.text + `<span style="background-color: #ff0000; color: #fff;">（${ data.targetText }）</span>`);
        $selector.html(html);
    }
}
