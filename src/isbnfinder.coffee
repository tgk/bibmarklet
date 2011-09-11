### ISBN handling ###

convertIsbnCharToInteger = (c) ->
 if c is 'X' or c is 'x' 
  10
 else 
  parseInt c

extractNumbersFromString = (s) ->
 (convertIsbnCharToInteger c for c in s.match /[0-9xX]/g)

# (digits[0] * 10) + (digits[1] * 9) + ... + (digits[9] * 2) mod 11 = 0?
correctChecksumForLength10 = (digits) ->
 sum = 0
 sum += (10 - i)*digits[i] for i in [0..9]
 sum % 11 is 0

# (digits[0] * 1) + (digits[1] * 3) + ... + (digits[12] * 1) mod 10 = 0?
correctChecksumForLength13 = (digits) ->
 check = 0
 check += 1*digit for digit in digits[0..13] by 2
 check += 3*digit for digit in digits[1..12] by 2 
 check % 10 is 0

correctChecksum = (isbn) ->
 digits = extractNumbersFromString isbn
 if digits.length is 13
  correctChecksumForLength13 digits
 else if digits.length is 10
  correctChecksumForLength10 digits
 else
  false

isbnPattern = /[0-9\-Xx]{10,17}/g
getIsbns = (s) -> s.match isbnPattern
getAllIsbns = -> $(document.body).find("*").map(-> getIsbns $(@).text()).filter( -> correctChecksum @ )
getAllUniqueIsbns = -> _.uniq getAllIsbns()

libraryUrl = (isbns) ->
 collapsed = isbns.join("+eller+is%3D")
 "http://bibliotek.dk/vis.php?origin=kommando&term1=is%3D#{collapsed}&target[]=dfa"

### Combining ###

searchAndOpenFrame = -> openFrame libraryUrl getAllUniqueIsbns()

