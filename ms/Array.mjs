//模拟实现数组splice方法
Array.prototype.splice2 = function(index,nums,...values){
    let startIndex = index+nums
    let addCount = values.length - nums
    if (nums<0) {
        throw new Error('erro:splice2 nums must >0')
    } else if(nums===0) {
        if(values.length===0){
            return
        }
        for(let i = this.length-1;i>=startIndex;i--){
            this[i+addCount] = this[i]
        }
        for(let i =0; i<values.length;i++){
            this[i+index] = values[i]
        }
    }else{
        if (addCount>0) {
            for(let i = this.length-1;i>=startIndex;i--){
            this[i+addCount] = this[i]
            }
            for(let i = 0;i<values.length;i++){
                this[i+index] = values[i]
            }
        } else if(addCount ===0 ){
            for(let i =0; i<values.length;i++){
                this[i+index] = values[i]
            }
        }else {
            for(let i =startIndex;i<this.length;i++){
                this[i+addCount] = this[i]
            }
            for(let i =0; i<values.length;i++){
                this[i+index] = values[i]
            }

            this.length = this.length+addCount
        }

    }
}