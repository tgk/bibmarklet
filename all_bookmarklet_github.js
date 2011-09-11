/* Overlay */var createFrame, openFrame, removeFrame;
removeFrame = function() {
  $("#bibframe_veil").fadeOut(750);
  $("#bibframe iframe").slideUp(500);
  return setTimeout("$('#bibframe').remove()", 750);
};
createFrame = function(url) {
  $("body").append("<div id=\"bibframe\">\n <div id=\"bibframe_veil\" style=\"\">\n  <p>Loading...</p>\n </div>\n <iframe src=\"" + url + "\" onload=\"$('#bibframe iframe').slideDown(500);\">\n  Enable iFrames.\n </iframe>\n <style type=\"text/css\">\n  #bibframe_veil { display: none; position: fixed;\n                   width: 100%; height: 100%; top: 0; left: 0;\n                   background-color: rgba(255,255,255,.25);\n                   cursor: pointer; z-index: 900; }\n #bibframe_veil p { color: black;\n                    font: normal normal bold 20px/20px Helvetica,\n                          sans-serif; position: absolute;\n                    top: 50%; left: 50%;\n                    width: 10em; margin: -10px auto 0 -5em;\n                    text-align: center; }\n #bibframe iframe { display: none; position: fixed;\n                    top: 10%; left: 10%; width: 80%; height: 80%;\n                    z-index: 999; border: 10px solid rgba(0,0,0,.5);\n                    margin: -5px 0 0 -5px; }\n </style>\n</div>");
  $("#bibframe_veil").fadeIn(750);
  return $("#bibframe_veil").click(function(event) {
    return removeFrame();
  });
};
openFrame = function(url) {
  if ($("#bibframe").length === 0) {
    return createFrame(url);
  } else {
    return removeFrame();
  }
};/* ISBN handling */var convertIsbnCharToInteger, correctChecksum, correctChecksumForLength10, correctChecksumForLength13, extractNumbersFromString, getAllIsbns, getAllUniqueIsbns, getIsbns, isbnPattern, libraryUrl, searchAndOpenFrame;
convertIsbnCharToInteger = function(c) {
  if (c === 'X' || c === 'x') {
    return 10;
  } else {
    return parseInt(c);
  }
};
extractNumbersFromString = function(s) {
  var c, _i, _len, _ref, _results;
  _ref = s.match(/[0-9xX]/g);
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    c = _ref[_i];
    _results.push(convertIsbnCharToInteger(c));
  }
  return _results;
};
correctChecksumForLength10 = function(digits) {
  var i, sum;
  sum = 0;
  for (i = 0; i <= 9; i++) {
    sum += (10 - i) * digits[i];
  }
  return sum % 11 === 0;
};
correctChecksumForLength13 = function(digits) {
  var check, digit, _i, _j, _len, _len2, _ref, _ref2;
  check = 0;
  _ref = digits.slice(0, 14);
  for (_i = 0, _len = _ref.length; _i < _len; _i += 2) {
    digit = _ref[_i];
    check += 1 * digit;
  }
  _ref2 = digits.slice(1, 13);
  for (_j = 0, _len2 = _ref2.length; _j < _len2; _j += 2) {
    digit = _ref2[_j];
    check += 3 * digit;
  }
  return check % 10 === 0;
};
correctChecksum = function(isbn) {
  var digits;
  digits = extractNumbersFromString(isbn);
  if (digits.length === 13) {
    return correctChecksumForLength13(digits);
  } else if (digits.length === 10) {
    return correctChecksumForLength10(digits);
  } else {
    return false;
  }
};
isbnPattern = /[0-9\-Xx]{10,17}/g;
getIsbns = function(s) {
  return s.match(isbnPattern);
};
getAllIsbns = function() {
  return $(document.body).find("*").map(function() {
    return getIsbns($(this).text());
  }).filter(function() {
    return correctChecksum(this);
  });
};
getAllUniqueIsbns = function() {
  return _.uniq(getAllIsbns());
};
libraryUrl = function(isbns) {
  var collapsed;
  collapsed = isbns.join("+eller+is%3D");
  return "http://bibliotek.dk/vis.php?origin=kommando&term1=is%3D" + collapsed + "&target[]=dfa";
};
/* Combining */
searchAndOpenFrame = function() {
  return openFrame(libraryUrl(getAllUniqueIsbns()));
};/* main */var libs;
if (typeof libs === 'undefined') {
  libs = document.createElement('script');
  libs.type = 'text/javascript';
  libs.onload = searchAndOpenFrame;
  libs.src = 'http://tgk.github.com/bibmarklet/all_libs.js';
  document.body.appendChild(libs);
} else {
  searchAndOpenFrame();
}