# Make sure jQuery is loaded.
# Should check that it isn't already
jQ = document.createElement 'script'
jQ.type = 'text/javascript'
jQ.onload = runthis
jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'
document.body.appendChild jQ

runthis = () -> 
 console.log "Opening iFrame"
 if $("#bibframe").length is 0 
  $("body").append """
   <div id="bibframe">
    <div id="bibframe_veil" style="">
     <p>Loading...</p>
    </div>
    <iframe src="http://en.wikipedia.org/w/index.php?&search=megusta" 
            onload="$('bibframe iframe').slideDown(500);">
     Enable iFrames.
    </iframe>
    <style type="text/css">
     #bibframe_veil { display: none; position: fixed; 
                      width: 100%; height: 100%; top: 0; left: 0; 
                      background-color: rgba(255,255,255,.25); 
                      cursor: pointer; z-index: 900; }
    #bibframe_veil p { color: black; 
                       font: normal normal bold 20px/20px Helvetica, 
                             sans-serif; position: absolute; 
                       top: 50%; left: 50%; 
                       width: 10em; margin: -10px auto 0 -5em; 
                       text-align: center; }
    #bibframe iframe { display: none; position: fixed; 
                       top: 10%; left: 10%; width: 80%; height: 80%; 
                       z-index: 999; border: 10px solid rgba(0,0,0,.5); 
                       margin: -5px 0 0 -5px; }
    </style>
   </div>"""
  $("bibframe_veil").fadeIn 750
 else
  $("bibframe_veil").fadeOut 750 
  $("bibframe iframe").slideUp 500
  setTimeout("$('bibframe').remove()", 750)

 $("bibframe veil").click (event) ->
  $("bibframe_veil").fadeOut 750
  $("bibframe iframe").slideUp 500
  setTimeout("$('bibframe').remove()", 750)
 
