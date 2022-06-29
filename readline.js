const readline = require('readline')

const rl = readline.createInterface(process.stdin, process.stdout)

let count1 = 0
rl.on('line',(line) => {
    if(count1 !== 0){
    const strArr = line.split(' ')
    const sorted = strArr.sort((a,b) => a.localeCompare(b))
    console.log(sorted.join(' '))
    }
    count1++
})