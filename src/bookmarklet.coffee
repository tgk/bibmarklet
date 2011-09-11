### main ###

if typeof libs is 'undefined'
 libs = document.createElement 'script'
 libs.type = 'text/javascript'
 libs.onload = searchAndOpenFrame
 libs.src = 'http://localhost:8000/all_libs.js'
 document.body.appendChild libs
else
 searchAndOpenFrame()

