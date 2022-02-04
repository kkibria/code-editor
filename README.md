# code-editor 


## The wrap behavior
We try our best not to break a word.

case 1: If the end column is on a word, 
    subcase a: If the begining of the word is col 0, break it after the end column.
    subcase b: If the begining of the word is after col 0, break right at the beginning of that word.
case 2: If the end column is on a space, we go break after the end column.

## editing

cursor setting has two operations
set_cursor(value: navigation) {
    if navigation:
        set_


    blah blah blah




}


todo: handle undo redo buffer
javascript does't have built in api.  
javascript provides clipboard access


switch (key): 
    Word or spaces:
        insert it at the cursor point

    delete:
        if we at the end of the line:
            if last line:
                do nothing
            else:
                merge with next line
        else:
            delete the next character

    backspace:
        if we at the beginning of the line:
            if first line:
                do nothing
            else:
                merge with previous line
        else:
            delete the previous character

    enter:
        split the line into two



    // navigation
    uparrow:
        move to previous line
        // if the line length smaller than curren col pos
        // then we move the cursor to adjust line length
        // but unless we modify the line this adjusted cursor position
        // is temporary, so that if we another uparrow it should be back
        // col when the last edit was made.

    downarrow:
        move to next line
        // same rule apply as uparrow.

    leftarrow:
        if we at the beginning of the line:
            if first line:
                do nothing
            else:
                move to the end of previous line
        else:
            move left by 1 character


    rightarrow:
        if we at the end of the line:
            if last line:
                do nothing
            else:
                move to the beginning of next line
        else:
            move right by 1 character
            