// let a=[1,2,3,4,5]

// // For in loop used for indexing and for of loop used for values at that index
// for (let b in a)
// {
//     console.log(a[b]);
// }
// console.log("");
// let sum=0;
// while(sum<5)
// {
//     console.log(a[sum])
//     sum++;
// }


let array=["Apple","banana",'Orange']
// console.log(array)

// for (let arr in array){
//     console.log(array[arr], arr)
// }
// console.log(" ")
// let b=array.push("kela")
// console.log(array,b)
// let a=array.pop()
// console.log(array,a)

// map method

let b=array.map((value)=>{
    console.log(value)
    return value;
})

console.log(b)

// Filter method
let a=array.filter((value)=>{
   
    if (value =="Apple"){
        return value
    }
      
    
})
console.log(a)