### ISBN handling ###

isbnPattern = /[0-9\-]{10,17}/g
getIsbns = (s) -> s.match isbnPattern

# Ide: Lav funktioner til (1) at hente sekvensen af tal (som tal) og (2) at foretage valideringen

getAllIsbns = -> $(document.body).find("*").map(-> getIsbns $(@).text())
getAllUniqueIsbns = -> _.uniq getAllIsbns()

libraryUrl = (isbns) ->
 collapsed = isbns.join("+eller+is%3D")
 "http://bibliotek.dk/vis.php?origin=kommando&term1=is%3D#{collapsed}&target[]=dfa"

### Combining ###

searchAndOpenFrame = -> openFrame libraryUrl getAllUniqueIsbns()

