const fetchPromise = fetch("https://cn.bing.com/dict/clientsearch?mkt=zh-CN&setLang=zh&form=BDVEHC&ClientVer=BDDTV3.5.1.4320&q=people");
fetchPromise.then(response => {
    return response.json();
}).then(people => {
    console.log(people);
});