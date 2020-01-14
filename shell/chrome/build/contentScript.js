/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/contentScript.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/contentScript.js":
/*!******************************!*\
  !*** ./src/contentScript.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

let text = '';
let pos = {
    top: 0,
    left: 0,
}
var className = '';
var chineseText = '';
document.addEventListener('mouseup', function (e) {
    if (e.target.id === 'im1') {
        return;
    }
    const selected = getSelectedText();
    if (selected.text ) {
        let classList = [];
        e.target.classList.forEach(function (elem) {
            classList.push('.' + elem);
        });
        className = classList.join("");
        var $domList = $(className);
        if ($domList.length > 0) {
            $domList.each(function (index, elem) {
                if (elem === e.target) {
                    className += `:eq(${ index })`;
                }
            });
        }
        pos = {
            left: e.pageX + 10,
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
                showTranslageTemplateHtml(text);
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
    console.log(doc);
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

function addToStorage () {
    let originDataStr = localStorage.getItem('trans-data'),
        list = [];
    if (originDataStr) {
        list = JSON.parse(originDataStr);
    }
    var data = {
        text: text,
        selector: className,
        targetText: chineseText,
    }
    list.push(data);
    localStorage.setItem("trans-data", JSON.stringify(list))
    resetStorageDataToHtml(data);
}

function hideTranslateTemplateHtml() {
    const dom = document.getElementById('tw-popup');
    if (dom) {
        dom.style = 'display: none;';
    }
}

function ajaxForBing (text, callback) {
    chrome.runtime.sendMessage({
        action: "ajaxTrans",
        type: "bing",
        text: text,
    }, function (data) {
        console.log(data.data);
        var doc = new DOMParser().parseFromString(data.data, "text/html");
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





/***/ })

/******/ });
//# sourceMappingURL=contentScript.js.map