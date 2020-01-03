chrome.tabs.executeScript({
    file: 'contentScript.js'
});

function genericOnClick(info, tab) {
    console.log("click info:")
    console.log(info)
}


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "ajaxTrans") {
            $.ajax({
                url: 'https://cn.bing.com/dict/clientsearch?mkt=zh-CN&setLang=zh&form=BDVEHC&ClientVer=BDDTV3.5.1.4320&q=' + request.text,
                success: function (res) {
                    sendResponse({data: res,});
                }
            });
            return true;
        }
    }
);


chrome.contextMenus.create({
        type: 'normal',
        title: '翻译',
        id: 'menu_trans_client',
        contexts: ['all'],
        onclick: genericOnClick
    }, function(){
        console.log('翻译菜单创建');
    }
);