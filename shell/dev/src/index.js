import $ from "jquery";
import css from "../../chrome/style/index.css";
import CssSelectorGenerator from "css-selector-generator";
import Popup from "../../../src/popup.js";
import Translate from "../../../src/translate.js";
import Icon from "../../../src/icon.js";
import { getSelectedText, clearSelect } from "../../../src/selection.js";
import { addToStorage } from "../../../src/storage.js";

Translate.setEnv("dev");

const selectorGenerator = new CssSelectorGenerator();
let text = '';
let pos = {
    top: 0,
    left: 0,
}

var className = '';

var selectedFunc = undefined;
var iconClickFunc = undefined;
Popup.on("selected", function (data) {
    selectedFunc(data.selected);
});

Icon.on("click", function () {
  iconClickFunc();
});

function selectedHandler (text, selector, curIndex) {
    return function (selected) {
        var data = {
          text: text,
          selector: selector,
          targetText: selected,
          index: curIndex,
        }
        addToStorage(data);
        resetStorageDataToHtml(data);
    }
}

function iconClickHandler (pos, index, className, text) {
  return function (selected) {
    Popup.show(text, {
      top: pos.top,
      left: pos.left + 30,
    },);
    selectedFunc = selectedHandler(text, className, index);
    clearSelect();
  }
}

document.addEventListener('dblclick', function (e) {
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
        iconClickFunc = iconClickHandler(pos, selected.index, className, selected.text);
        Icon.show(pos);
    } else {
        Icon.hide();
    }
    text = selected.text;
});

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
        var re = new RegExp(data.text,"g");
        var index = 0;
        html = html.replace(re, function () {
          var text = undefined;
          if (index == data.index) {
            text = data.text + "(" + data.targetText + ")";
          } else {
            text = data.text;
          }
          index++;
          return text;
        });
        $selector.html(html);
    }
}
