export function addToStorage ({ text, className, chineseText }) {
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
}
