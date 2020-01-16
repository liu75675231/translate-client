export function addToStorage ({ text, selector, targetText, index }) {
    let originDataStr = localStorage.getItem('trans-data'),
        list = [];
    if (originDataStr) {
        list = JSON.parse(originDataStr);
    }
    var data = {
        text: text,
        selector: selector,
        targetText: targetText,
        index: index,
    }
    list.push(data);
    localStorage.setItem("trans-data", JSON.stringify(list))
}

export function getDataFromStorage () {
    return localStorage.getItem('trans-data', 'data');
}