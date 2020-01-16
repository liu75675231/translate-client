class Icon {
  constructor () {
    this.isInited = false;
    this.$img = null;
    this.events = {
      click: [],
    };
  }
  init () {
    this.isInited = true;
    var img = this.$img = document.createElement('img');
    img.src = 'https://shuati-images.oss-cn-beijing.aliyuncs.com/images/logo32.png';
    img.id = 'im1';
    this.initEvent();
    document.body.appendChild(img);
  }

  initEvent () {
    var _this = this;
    this.$img.addEventListener('click', function (e) {
      // var curPos = JSON.parse(e.target.getAttribute("pos"));
      // var curIndex = e.target.getAttribute("index");
        _this.hide();
        e.stopPropagation();
        _this.events.click.forEach(function (callback) {
          callback(e);
        });
        // if (text) {
        //     Popup.show(text, {
        //       top: curPos.top,
        //       left: curPos.left + 30,
        //     },);
        //     selectedFunc = selectedHandler(text, className, curIndex);
        //     clearSelect();
        //     hideImg();
        // }
    });
  }

  on (eventName, callback) {
    this.events[eventName].push(callback);
  }

  show (pos) {
    if (!this.isInited) {
      this.init();
    }

//    img.setAttribute("pos", JSON.stringify(pos));
//    img.setAttribute("index", index);
    this.$img.style = 'position: absolute; top: ' + pos.top + 'px; left: ' + (pos.left + 30) + 'px;';
  }
  hide () {
    this.$img.style = 'display: none;';
  }
}

export default new Icon();