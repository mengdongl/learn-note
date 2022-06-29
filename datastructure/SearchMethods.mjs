const Compare = {
    BIGGER_THAN:1,
    LESS_THAN:-1,
    EQUALS:0
}
function defaultCompare(a,b){
    if (a>b) {
        return Compare.BIGGER_THAN
    } else if(a<b) {
        return Compare.LESS_THAN
    }else{
        return Compare.EQUALS
    }
}
//二分搜索算法
function binarySearch (array=[],val,compareFn = defaultCompare){
    let low = 0
    let height = array.length-1
    while(low<=height){
        const middle = Math.floor((low+height)/2)
        switch(compareFn(val,array[middle])){
            case Compare.EQUALS:
                return middle
            case Compare.BIGGER_THAN:
                low = middle + 1
                break;
            case Compare.LESS_THAN:
                height = middle -1
        }
    }
    return -1
}

let a = [1,2,4,5,6,7]

console.log(binarySearch(a,7))