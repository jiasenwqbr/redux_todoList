
// const test = (target) => {
//     target.num = 100
//     target.getNum = function getNum(){
//         console.log(this.num)
//     }
//     target.prototype.say = function say(){}
// }
// @test
// class Demo{}

// console.dir(Demo)

/* const test = (x,y) => {
    console.log(1)
    return (target) => {
        console.log(2)
        target.num = x + y
    }
}

const handle = () => {
    console.log(3)
    return (target) => {
        console.log(4)
        target.handle = 'AAA'
    }
}

@test(10,20)
@handle()
class Demo {} */

/* const test = (target,name,describe) => {
    
    console.log("target:",target,'name:',name,"describe:",describe)
}

class Demo {
    @test x=100

    @test getX(){

    }
} */
/* 
const readonly = (_,name,describe) => {
    describe.writable = false
}

const loggerTime = (_,name,describe) => {
    let func = describe.value
    console.log("func:",func)
    //console.log(describe)
    describe.value = function proxy (...params){
        console.log("...params:",...params)
        console.time(name)
        let res = func.call(this,...params)
        console.timeEnd(name)
        console.log("res:",res)
        return res
    }
}

class Demo {
    @readonly x = 100

    @readonly
    @loggerTime
    getX(){
        for (let i=0; i < 10000000;i++){}
        return this.x
    }

    @loggerTime
    sum(){
        for (let i = 0;i<9999999;i++){}
    }
}

let d = new Demo
d.sum() */

/* function log(target,name,descriptor){
    console.log("target:",target)
    console.log("name:",name)
    console.log("descriptor:",descriptor)
    const originMethod = descriptor.value
    descriptor.value = function (...args){
        console.log(`Calling ${name} with arguments: ${args}`);
        const result = originMethod.apply(this,args)
        console.log(`Returned from ${name} with result: ${result}`);
        return result;
    }
    return descriptor
}

class Calculator{
    @log
    add(a,b){
        console.log('in add function ')
        return a+b
    }
}

const calculator = new Calculator()
const sum = calculator.add(2,3)
console.log(`Sum is : ${sum}`) */








