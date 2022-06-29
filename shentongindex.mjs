const assert = require("power-assert");
const testResults = [];
//==============================答题部分 start==============================

/********************第 1 题**********************/
// 用正则解析 url 的参数

// 入参格式参考：
const sourceUrl = "https://www.taobao.com?a=1&b=2&c=3&d#name";
// 出参格式参考：
const params = {
  a: "1",
  b: "2",
  c: "3",
  d: null
};

function queryParse() {
  /**
   * 此处写代码逻辑
   */
   //对正则记得不太清楚。。。
   const params = {}
   const searchPath = Location.search
   const searchStr = searchPath ? searchPath.split('#')[0] : ''
   const searchStrArray = searchStr.split('&')
   for(let item of searchStrArray){
     const itemArray = item.slipt('=')
     const [key,value] = itemArray
     params[key] = value
   }
   return params
}

/*******单测部分*******/
try {
  assert.deepEqual(queryParse(""), {});
  assert.deepEqual(queryParse("https://www.taobao.com"), {});
  assert.deepEqual(queryParse("https://www.taobao.com?a=1&b=2&c=3&d#name"), {
    a: "1",
    b: "2",
    c: "3",
    d: null
  });
  testResults[0] = "通过";
} catch {
  testResults[0] = "不通过";
}

/********************第 2 题**********************/
// 判断一个链路是否对称闭环
// input: 1->2
// ouput: false

// input 1->2->3->2->1
// ouput: true

function isSymmetricalClosed(path) {
  /**
   * 此处写代码逻辑
   */
   const pathArray = path.split('->')
   let left = 0
   let right = pathArray.length-1
   let result = true
   while (left<right) {
     if(pathArray[left]!==pathArray[right]) return false
     left++
     right--
   }
   return result
}

/*******单测部分*******/
try {
  assert(isSymmetricalClosed("1->2") === false);
  assert(isSymmetricalClosed("1") === true);
  assert(isSymmetricalClosed("1->5->3->5->1") === true);
  assert(isSymmetricalClosed("1->2->3->1") === false);
  testResults[1] = "通过";
} catch {
  testResults[1] = "不通过";
}

/********************第 3 题**********************/
// 顺序打印一个列表，两次打印间需要有时间间隔
// 入参格式参考：list = [1, 2, 3, 4]  delay = 5
// 控制台输出情况：
// > 1
// （过了 5 秒）
// > 2
// （过了 5 秒）
// > 3
// （过了 5 秒）
// > 4

async function printList(list, delay) {
  /**
   * 此处写代码逻辑
   */
   const sleep = async (time) => {
     await new Promise(resolve => {
       setTimeout(resolve, time);
     })
   }

   for(let i = 0; i<=list.length-1; i++){
     console.log(list[i])
     await sleep(delay)
   }
}

function test(list, delay) {
    /**
     * 此处写代码逻辑
     */
     const promiseAry = list.map((item,index) => {
         return new Promise(resolve => {
             setTimeout(() => {
                 console.log(item)
                 resolve()
             },delay*index)
         })
     })
}

/********************第 4 题**********************/
// 从一个树状数据结构中，找出值最大的一个节点
// 入参格式参考：
const sourceTree = {
  id: "i1",
  value: 17,
  left: {
    id: "i3",
    value: 83,
    left: {
      id: "i4",
      value: 101
    },
    right: {
      id: "i9",
      value: 22
    }
  },
  right: {
    id: "i11",
    value: 26
  }
};
// 出参格式参考：
const maxNode = {
  id: "i4",
  value: 101
};

function findMaxNode(tree) {
  /**
   * 此处写代码逻辑
   */
   let maxValue = -1
   let maxValueId = ''
   const map = new Map()

   const traTree = (treeNode,callback) => {
     if(!treeNode) return
     if(treeNode.left) traTree(treeNode.left,callback)
     callback(treeNode)
     if(treeNode.right) traTree(treeNode.right,callback) 
   }

   const findMax = (node) => {
     if(node.value > maxValue){
       maxValue = node.value
       maxValueId = node.id
     }
     map.set(node.id,node)
   }

   traTree(tree,findMax)

   return map.get(maxValueId)
}

const isValidBST = function(root) {
    let lastVal = -Infinity
    let result = true
    const traTree = (root,callback) => {
        if(!root) return
        traTree(root.left,callback)
        callback(root.val)
        traTree(root.right,callback)
    }
    const cb = (val) => {
        if (val<lastVal) {result = false;}
        lastVal = val
    }
    traTree(root,cb)
    return result
} 

/*******单测部分*******/
try {
  assert.deepEqual(
    findMaxNode({
      id: "i1",
      value: 17,
      left: {
        id: "i3",
        value: 83,
        left: {
          id: "i4",
          value: 101
        },
        right: {
          id: "i9",
          value: 22
        }
      },
      right: {
        id: "i11",
        value: 26
      }
    }),
    {
      id: "i4",
      value: 101
    }
  );
  assert.deepEqual(findMaxNode({ id: "i1", value: 10 }), {
    id: "i1",
    value: 10
  });
  assert.deepEqual(findMaxNode({ id: "i1", value: 10, left: { id: "i2" } }), {
    id: "i1",
    value: 10
  });
  testResults[3] = "通过";
} catch {
  testResults[3] = "不通过";
}

/********************第 5 题**********************/
// 实现一个日程安排函数，可以不断地登记行程安排，但不允许时间上出现三重重叠
// *三重重叠的含义为：有某个日期，同时被三次登记覆盖到
// *不考虑不同月份，并且假定每个月都是 31 天
// * book(1, 10)，两个数字入参的含义为预定 1~10 号
// * 函数返回 true 代表预定成功，返回 false 代表预定失败

// const mySchedule = new Calendar();
// mySchedule.book(1, 10) true
// mySchedule.book(8, 14) true (8-10 双重重叠)
// mySchedule.book(22, 30) true
// mySchedule.book(2, 9) false (8-9 三重重叠)
// mySchedule.book(18，20) true
// mySchedule.book(32，34) false (一个月只有 31 天)

class Calendar {
  /**
   * 此处写代码逻辑
   */
   dataMap = new Map()

   book(start,end){
     let result = true
     if(start <= 0 || end >= 31) return false
     for(let i = start; i<= end; i++){
       let dayCount = this.dataMap.has(i) ? this.dataMap.get(i) : 0
       if(dayCount >= 2 ) return false
       this.dataMap.set(i,++dayCount)
     }
     return true
   }
}

/*******单测部分*******/
try {
  const mySchedule = new Calendar();
  assert(mySchedule.book(0, 0) === false);
  assert(mySchedule.book(32, 35) === false);
  assert(mySchedule.book(1, 10) === true);
  assert(mySchedule.book(8, 14) === true);
  assert(mySchedule.book(12, 16) === true);
  assert(mySchedule.book(22, 30) === true);
  assert(mySchedule.book(2, 9) === false);
  assert(mySchedule.book(18, 20) === true);
  assert(mySchedule.book(13, 17) === false);
  testResults[4] = "通过";
} catch {
  testResults[4] = "不通过";
}

//==============================答题部分 end================================

//==============================说明部分 start==============================

import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <div>
        <h1>题目列表</h1>
        <p>1. 用正则解析 url 的参数</p>
        <p>2. 判断一个链路是否对称闭环</p>
        <p>3. 顺序打印一个列表，两次打印间需要有时间间隔</p>
        <p>4. 从一个树状数据结构中，找出值最大的一个节点</p>
        <p>
          5.实现一个日程安排函数，可以不断地登记行程安排，但不允许时间上出现三重重叠
        </p>
      </div>
      <div>
        <h1>答题说明</h1>
        <p>1. 请 fork 到自己的账号下完成题目</p>
        <p>2. 所有题目需要用原生 JS 实现，不能借助第三方类库</p>
        <p>3. 答题部分在上方，包含了每道题的补充说明和入参出参格式 demo</p>
        <p>
          4. 每道题的下方有单测，可以验证代码正确性（第 3
          题除外），答题时也可自行添加用例
        </p>
        <p>
          <font color="red">
            *5. 尽可能完成所有题目, 有疑问联系对应的面试官
          </font>
        </p>
      </div>
      <div>
        <h1>单测结果</h1>
        <p>第 1 题：{testResults[0]}</p>
        <p>第 2 题：{testResults[1]}</p>
        <p>第 4 题：{testResults[3]}</p>
        <p>第 5 题：{testResults[4]}</p>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
//==============================说明部分 end================================
