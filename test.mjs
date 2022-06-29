// function * test(){
//     let a = yield new Promise(resolve=>{
//         setTimeout(()=>{
//             resolve('花了0.5秒')
//         },500)
//     })
//     console.log(a)
//     let b = yield new Promise(resolve=>{
//         setTimeout(()=>{
//             resolve('花了1.5秒')
//         },1000)
//     })
//     console.log(b)
//     let c = yield 3
//     console.log(c)
//     return 'ddd'
// }
// function runG(genF){
//     let gen = genF()
//     return new Promise((resolve,reject)=>{
//         function move(val){
//             let next =gen.next(val)
//             if (next.done) {
//                 resolve(next.value)
//             } else {
//                 Promise.resolve(next.value).then(res=>{
//                 move(res)
//                 }).catch(err=>{
//                     reject(err)
//                 })
//             }
//         }
//         move()
//     })
// }

// runG(test).then(res=>{
//     console.log(res)
// })
let s1 = new Set([1, 2, 3])
let s2 = new Set([1, 2, 7, 8, 9])

function isZj(s1, s2) {
    let flag = true
    for (let item of s1) {
        if (!s2.has(item)) {
            flag = false
        }
    }
    return flag
}

var maxSubArray = function (nums) {
    let dp = 0
    let max = nums[0]
    for (let i = 0; i < nums.length; i++) {
        dp = Math.max(dp + nums[i], nums[i])
        max = Math.max(max, dp)
        console.log({ i, dp, max })
    }
    return max
};
// maxSubArray([-2,1,-3,4,-1,2,1,-5,4])

function money(prices = []) {
    let dp = 0
    let max = 0
    for (let i = 0; i < prices.length - 1; i++) {
        let earn = prices[i + 1] - prices[i]
        dp = Math.max(dp + earn, earn)
        max = Math.max(dp, max)
    }
    return max
}

// console.log(money([7,1,5,3,6,4]))

// console.log(46^46)

function lengthOfLongestSubstring(str = '') {
    const strAry = str.split('')

    const set = new Set()
    let end = 0
    let maxLength = 0
    for (let i = 0; i < strAry.length; i++) {
        while (!set.has(strAry[end]) && end < strAry.length) {
            set.add(strAry[end])
            end++
        }
        set.delete(strAry[i])
        maxLength = Math.max(maxLength, end - i)
        console.log({ i, end, strAry })
    }
    return maxLength
}


// console.log(lengthOfLongestSubstring('pwwkew'))


var threeSum = function (nums = []) {
    // 返回体
    let lists = []
    // 排序
    nums = nums.sort()
    console.log(nums)
    // 一次遍历
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            return lists;
        }
        // 避免重复项
        if (nums[i] == nums[i + 1]) {
            continue;
        }
        // 双指针定义
        let L = i + 1;
        let R = nums.length - 1;

        while (L < R) {
            let sum = nums[i] + nums[L] + nums[R];
            if (sum == 0) {
                lists.push([nums[i], nums[L], nums[R]]);
                // 避免重复项
                while (L < R && nums[L + 1] == nums[L]) {
                    L++;
                }
                while (L < R && nums[R - 1] == nums[R]) {
                    R--;
                }
                L++;
                R--;
            } else if (sum > 0) {
                R--;
            } else {
                L++;
            }
        }

    }
    return lists;
};
// console.log(threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4]))

// let n1 = { value: 3, next: null }
// let n2 = { value: 2, next: null }
// let n3 = { value: 0, next: null }
// let n4 = { value: -4, next: null }
// n1.next = n2
// n2.next = n3
// n3.next = n4
//  n4.next = n2
var hasCycle = function (head) {
    let slow = head
    let fast = head.next
    while (slow != fast) {
        if (!fast || !fast.next) {
            return false
        }
        slow = slow.next
        fast = fast.next.next
    }
    return true
};

// console.log(hasCycle(n1))
let n1 = { value: 1, next: null }
let n2 = { value: 2, next: null }
let n3 = { value: 3, next: null }
let n4 = { value: 4, next: null }
let n5 = { value: 5, next: null }
n1.next = n2
// n2.next = n3
// n3.next = n4
// n4.next = n5
var removeNthFromEnd = function (head, n) {
    if (!head) {
        return null
    }
    let left = null
    let right = head
    let index = 0
    while (right != null) {
        if (index >= (n) && left == null) {
            left = head
        }
        right = right.next
        if (left) {
            left = left.next
        }
        index++
    }
    console.log(left)
    // if (left) {
    //     let tem = left.next
    //     left.next = tem.next
    //     tem.next = null
    // }
    return head
};
// let result = removeNthFromEnd(n1, 1)
// while (result) {
//     console.log(result.value)
//     result = result.next
// }

var nextPermutation = function (nums = []) {
    let min
    let max
    for (let i = nums.length - 1; i > 0; i--) {
        if (nums[i] > nums[i - 1]) {
            min = i-1
            break
        }
    }
    if (min !== undefined) {
        for (let j = nums.length - 1; j > min; j--) {
            if (nums[j] > nums[min]) {
                max = j
                break
            }
        }
        [nums[min], nums[max]] = [nums[max], nums[min]]
        // for(let r = nums.length-1;r>min;r--){
        //     [nums[r], nums[r-1]] = [nums[r-1], nums[r]]
        // }
    } else {

    }
}
// let a = [4,5,2,6,3,1]
// nextPermutation(a)
// console.log(a)
// const path = require('path')
// const myPath = './css/flex'
// console.log('hhh:'+path.resolve(myPath,'../dist'))
let l1 = {value:3,next:null}
let l2 = {value:2,next:null}
let l3 = {value:0,next:null}
let l4 = {value:-4,next:null}
l1.next = l2
l2.next = l3
l3.next = l4
l4.next = l2
var detectCycle = function (head){
    if(head==null){
        return null
    }
    let slow=head ,fast=head
    while(fast!=null){
        slow = slow.next
        if(fast.next!=null){
            fast = fast.next.next
        }
        if (fast === slow) {
            let result = head
            while(result!==fast){
                result = result.next
                fast = fast.next
            }
            return result
        }
    }
    return null
}

// console.log(detectCycle(l1))

// let person = {};
// Object.defineProperty(person, "name", {
//   configurable: false,
//   writable:true,
//   enumerable:true,
//   value: "Nicholas"
// });
// person.name = '1'
// Object.defineProperty(person, "name", {
//     value: "cdd"
//   });

// person.name = '2'
// console.log(person)
// let p1 = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve(132,'DD')
//     },1000)
// }).then((res1,res2)=>{
// console.log(res1,',',res2)
// })
function P(){

}
P.prototype.back=function(){
    return this
}
constructor
function S(){
    P.call(this)
    this.name = "mdl"
}

function extendtion(F,S){
    let proto = Object.create(F.prototype)
    proto.constructor = S
    return proto
}
S.prototype = extendtion(P,S)

let son = new S()
// console.log(son.back())

Promise.resolve(Promise.reject({err:'发生错误'})).then(console.log,err => console.log(err,'err'))



