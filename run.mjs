var threeSum = function(nums) {
    const ans = []
    nums.sort((a,b) => a - b)
    const towSum = (arr,left,right,target,value) => {
        const res = []
        while(left < right){
            const sum = arr[left] + arr[right]
            if (sum === target) {
                res.push([value,arr[left],arr[right]])
                while(left<right && arr[left] === arr[left+1]){
                    left++
                }
                left++
                while(left<right && arr[right] === arr[right-1]){
                    right--
                }
                right--
            } else if(sum < target) {
                left++
            } else {
                right--
            }
        }
        return res
    }
    
    for(let i=0; i< nums.length; i++){
        if(i>0 && nums[i] === nums[i-1]) continue
        const res = towSum(nums,i+1,nums.length-1,-nums[i],nums[i])
        ans.push(...res)
    }

    return ans
};

console.log(threeSum([-1,0,1,2,-1,-4]))

