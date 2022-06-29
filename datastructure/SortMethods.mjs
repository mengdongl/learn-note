const Compare = {
    BIGGER_THAN: 1,
    LESS_THAN: -1,
    EQUALS: 0
}

export function defaultCompare(a, b) {
    if (a > b) {
        return Compare.BIGGER_THAN
    } else if (a < b) {
        return Compare.LESS_THAN
    } else {
        return Compare.EQUALS
    }
}
//冒泡排序算法
export function bubbleSort(array = [], compareFn = defaultCompare) {
    const { length } = array
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i; j++) {
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]
            }
        }
    }
    return array
}
//选择排序算法
export function selectionSort(array = [], compareFn = defaultCompare) {
    const { length } = array
    for (let i = 0; i < length - 1; i++) {
        let minIndex = i
        for (let j = i; j < length; j++) {
            if (compareFn(array[minIndex], array[j]) === Compare.BIGGER_THAN) {
                minIndex = j
            }
        }
        [array[minIndex], array[i]] = [array[i], array[minIndex]]
    }
    return array
}
//插入排序算法
export function insertionSort(array = [], compareFn = defaultCompare) {
    const { length } = array
    for (let i = 1; i < length; i++) {
        let insertIndex = i
        while (compareFn(array[insertIndex], array[insertIndex - 1]) === Compare.LESS_THAN && insertIndex > 0) {
            [array[insertIndex], array[insertIndex - 1]] = [array[insertIndex - 1], array[insertIndex]]
            insertIndex--
        }
    }
    return array
}
//归并排序
export function mergeSort(array = [], compareFn = defaultCompare) {
    if (array.length > 1) {
        const middleIndex = Math.floor(array.length / 2)
        const left = mergeSort(array.slice(0, middleIndex), compareFn)
        const right = mergeSort(array.slice(middleIndex), compareFn)
        array = mergeFn(left, right, compareFn)
    }
    return array
}
function mergeFn(left, right, compareFn) {
    let i = 0
    let j = 0
    let result = []
    while (i < left.length && j < right.length) {
        result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++])
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

//快速排序
export function quickSort(array = [], compareFn = defaultCompare) {
    return quick(array, 0, array.length - 1, compareFn)
}
export function quick(array = [], left, right, compareFn = defaultCompare) {
    if (array.length > 1) {
        const index = partition(array, left, right, compareFn)
        if (left < index - 1) {
            quick(array, left, index - 1, compareFn)
        }
        if (index < right) {
            quick(array, index, right, compareFn)
        }
    }
    return array
}
const partition = (array = [], left, right, compareFn = defaultCompare) => {
    let l = left;
    let r = right;
    const middle = array[Math.floor((l + r) / 2)]
    while (l <= r) {
        while (compareFn(array[l], middle) === Compare.LESS_THAN) {
            l++
        }
        while (compareFn(array[r], middle) === Compare.BIGGER_THAN) {
             r-- 
        }
        if (l <= r) {
            [array[r],array[l]] = [array[l],array[r]]
            l++
            r--
        }
    }
    return l
}