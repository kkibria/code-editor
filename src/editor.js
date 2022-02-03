export function calcfrags(line, maxcols) {
    const re = /\w/g;
    function isW(i) {
        re.lastIndex = i;
        let found = re.test(line);
        return found && re.lastIndex - 1 == i;
    }

    let pres = line;
    let len = line.length;
    let brkidx = [];

    let fncbgn = 0;
    let fncend;
    let curlen;

    function savebrk() {
        fncend = fncbgn + maxcols;
        curlen = len - fncbgn;
        brkidx.push(fncbgn);
    }

    savebrk();
    while (curlen > maxcols) {
        let nxtbgn = fncend;
        if (isW(fncend)) {
            let i = fncend - 1;
            while (i > fncbgn) {
                if (!isW(i)) {
                    nxtbgn = i + 1;
                    break;
                }
                i--;
            }
        }
        fncbgn = nxtbgn;
        savebrk();
    }
    brkidx.push(len);
    let frags = [];
    for (let i = 1; i < brkidx.length; i++) {
        frags.push([brkidx[i - 1], brkidx[i]]);
    }
    return { cont: line, pres: pres, frags: frags };
}
