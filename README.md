# code-editor 


## The wrap behavior
We try our best not to break a word.

case 1: If the end column is on a word, 
    subcase a: If the begining of the word is col 0, break it after the end column.
    subcase b: If the begining of the word is after col 0, break right at the beginning of that word.
case 2: If the end column is on a space, we go break after the end column.

first we scan for next beginning
a word is \s*/\S+\s*