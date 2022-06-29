import {Stack} from './datastructure/Stack.mjs'
//十进制转二进制
function decimalToBinary (value){
    let num = value
    let stack = new Stack()
    let rem 
    while(num>0){
        rem = Math.floor(num % 2)
        stack.push(rem)
        num = Math.floor(num/2)
    }
    let result=''
    while(!stack.isEmpty()){
        result += `${stack.pop()}`
    }

    return result
}

let str = decimalToBinary(10)
console.log(str)