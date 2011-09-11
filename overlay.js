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
};