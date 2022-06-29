// import {quickSort} from './SortMethods.mjs'

const quickSort = (array = []) => {
    return quick(array, 0, array.length - 1)
}
const quick = (array, left, right) => {
    if (array.length > 1) {
        const index = partition(array, left, right)
        if (left < index - 1) quick(array, left, index - 1)
        if (right > index) quick(array, index, right)
    }
    return array
}
const partition = (array, left, right) => {
    let l = left;
    let r = right;
    const middle = array[Math.floor((l + r) / 2)]
    while (l <= r) {
        while (array[l] < middle) {
            l++
        }
        while (array[r] > middle) {
            r--
        }
        if (l <= r) {
            [array[l], array[r]] = [array[r], array[l]]
            l++
            r--
        }
    }
    return l
}
const a = [3, 1, 4, 6, 7, 5, 2, 9, 8]

console.log(quickSort(a))