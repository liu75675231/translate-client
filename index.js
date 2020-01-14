// const fs = require('fs');
// const jsdom = require('jsdom');

// const { JSDOM } = jsdom;
// const data = {
//   title: '',
//   pronList: [],
//   meaningList: [],
// };

// const htmlStr = fs.readFileSync("./mock/cn.bing.com", "utf8");
// const dom = new JSDOM(htmlStr);
// const document = dom.window.document;

// data.title = document.querySelector('.client_def_hd_hd').innerHTML;

// const pinyinList = document.querySelectorAll('.client_def_hd_pn');
// pinyinList.forEach((elem) => {
//   data.pronList.push(elem.innerHTML);
// });

// const meaningList = document.querySelector ('.client_def_container').querySelectorAll('.client_def_bar');
// meaningList.forEach((meaning) => {
//   const clientDefTitle = meaning.querySelector('.client_def_title');
//   if (clientDefTitle) {
//     data.meaningList.push({
//       type: clientDefTitle.innerHTML,
//       wordList: meaning.querySelector('.client_def_list_word_bar').innerHTML.split('；'),
//     });
//   }
// });
// console.log(data);

// fs.writeFileSync('./output/temp-mock-cn-bing.com.txt', JSON.stringify(data));


var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
    });

}).listen(8080);