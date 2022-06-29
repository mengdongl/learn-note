function getUrlParam2(sUrl, sKey) {
    var result, Oparam = {};
    sUrl.replace(/[\?&]?(\w+)=(\w+)/g, function ($0, $1, $2) {
        console.log('$0:' + $0 + "     $1:" + $1 + "     $2:" + $2);
        Oparam[$1] === void 0 ? Oparam[$1] = $2 : Oparam[$1] = [].concat(Oparam[$1], $2);
    });
    sKey === void 0 || sKey === '' ? result = Oparam : result = Oparam[sKey] || '';
    return result;
}


const reg = new RegExp(/[\?&](\w+)(=(\w+))?/g)
const str = 'https://www.taobao.com?a=1&b=2&c=3&d#name'
console.log(str.replace(reg,($0,$1,$2,$3) => {
    console.log('$0:' + $0 + "     $1:" + $1 + "     $2:" + $2 +"     $3:"+$3);
    return 'mdl'
}))

