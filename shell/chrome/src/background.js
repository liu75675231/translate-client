chrome.tabs.executeScript({
    file: 'contentScript.js'
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "ajaxTrans") {
        $.ajax({
            url: 'https://cn.bing.com/dict/clientsearch?mkt=zh-CN&setLang=zh&form=BDVEHC&ClientVer=BDDTV3.5.1.4320&q=' + request.text,
            success: function (res) {
                sendResponse({data: res,});
            }
        });
        return true;
    }
});

chrome.contextMenus.create({
    id: "some-command",
    title: "Search in UrbanDictionary",
    contexts:["all"],
  });

  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "some-command") {
        console.log("yay!");
    }
});