/* ISBN handling */var convertIsbnCharToInteger, correctChecksum, correctChecksumForLength10, correctChecksumForLength13, extractNumbersFromString, getAllIsbns, getAllUniqueIsbns, getIsbns, isbnPattern, libraryUrl, searchAndOpenFrame;
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
};