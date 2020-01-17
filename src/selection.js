export function getSelectedText () {
  if (window.getSelection) {
      var range = window.getSelection ();
      var text = range.toString().trim();
      var s = range.focusNode.wholeText; 
      var re = new RegExp(text,"g");
      var count = s.match(re).length;
      var subS = s.substring(range.focusOffset);
      var matchList = subS.match(re);
      var index = count - 1;
      if (matchList) {
        index = count - subS.match(re).length - 1;
      }

      return {
          text: text,
          pos: range.getRangeAt(0).getBoundingClientRect(),
          index: index,
      };
  }
}

export function clearSelect () {
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