var data = {
    allitems: {
        exp: [1,5,6,25],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    }
}

//ID = data.allitems.inc[data.allitems.inc.length - 1] + 1;
ID = data.allitems.exp[data.allitems.exp.length - 1] + 1;
console.log(ID);