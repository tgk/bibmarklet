if (typeof jQuery == 'undefined') {
	// http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS
	var jQ = document.createElement('script');
	jQ.type = 'text/javascript';
	jQ.onload=runthis;
	jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	document.body.appendChild(jQ);
} else {
	runthis();
}

function runthis() {
    if ($("#bibframe").length == 0) {
	var s = "";
	// Should default to using jquery to extract all isbn numbers
	// Use old coffeescript code for that
	s = getSelText();
	if (s == "") {
	    
	    var s = prompt("Forget something?");
	}

	
	
	if ((s != "") && (s != null)) {
	    $("body").append("\
<div id='bibframe'>\
<div id='bibframe_veil' style=''>\
<p>Loading...</p>\
</div>\
<iframe src='http://bibliotek.dk/vis.php?origin=kommando&term1=is%3D"+s+"&target[]=dfa' onload=\"$('#bibframe iframe').slideDown(500);\">Enable iFrames.</iframe>\
<style type='text/css'>\
#bibframe_veil { display: none; position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(255,255,255,.25); cursor: pointer; z-index: 900; }\
#bibframe_veil p { color: black; font: normal normal bold 20px/20px Helvetica, sans-serif; position: absolute; top: 50%; left: 50%; width: 10em; margin: -10px auto 0 -5em; text-align: center; }\
#bibframe iframe { display: none; position: fixed; top: 10%; left: 10%; width: 80%; height: 80%; z-index: 999; border: 10px solid rgba(0,0,0,.5); margin: -5px 0 0 -5px; }\
</style>\
</div>");
	    $("#bibframe_veil").fadeIn(750);
	}
    } else {
	$("#bibframe_veil").fadeOut(750);
	$("#bibframe iframe").slideUp(500);
	setTimeout("$('#bibframe').remove()", 750);
    }
    $("#bibframe_veil").click(function(event){
	$("#bibframe_veil").fadeOut(750);
	$("#bibframe iframe").slideUp(500);
	setTimeout("$('#bibframe').remove()", 750);
    });
}

function getSelText() {
    var s = '';
    if (window.getSelection) {
	s = window.getSelection();
    } else if (document.getSelection) {
	s = document.getSelection();
    } else if (document.selection) {
	s = document.selection.createRange().text;
    }
    return s;
}

var isbn_pattern = /[0-9]{10}/g;
var get_all_isbns = function() {
    $(document).find("*").map(function() {
	return get_isbns(this.text);
    }).get()};

