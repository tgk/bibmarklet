$ = require('jquery')
_ = require('underscore')

isbn_pattern = /[0-9]{10}/g
get_isbns = (s) -> s.match isbn_pattern

print = (s) -> console.log s

# Examples taken from amazon.com
print "too short: #{ get_isbns "032134960" } "
print "ISBN-10: #{ get_isbns "0321349601" } "
print "ISBN-13: #{ get_isbns "978-0321349606" } "
print "too long: #{ get_isbns "978-10321349606" } "
print "a long example: #{ get_isbns """The ISBN number can be both 0321349601 and 
                                       978-0321349606, but who knows""" } "

example_content = """
<!DOCTYPE html>
<html>
<head>
  <style>
  h3 { margin: 0; }
  div,span,p {
    width: 80px;
    height: 40px;
    float:left;
    padding: 10px;
    margin: 10px;
    background-color: #EEEEEE;
  }
  </style>
</head>
<body>
  <div>DIV with isbn: 0321349601 and 1321349601</div>
  <span>SPAN with 1234567890</span>
  <p>P <button>Button with isbn: 1111111111</button></p>
</body>
</html>
"""

print _.uniq $(example_content).find("*").map( -> get_isbns @text ).get()