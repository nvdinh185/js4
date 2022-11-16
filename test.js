// function Validator2(options) {
//     console.log(options(111));
// }
// function myMethod() {
//     return function (x) {
//         return x + 10;
//     }
// }
// Validator2(myMethod());

// function Validator2(options) {
//     let res = options(111);
//     console.log(res);
// }
// function myMethod() {
//     return function (x) {
//         return x + 10;
//     }
// }
// Validator2(myMethod());

function Validator2(options) {
    let res = options.a();
    console.log(res);
}
function myFunction() {
    return function (x) {
        return x + 10;
    }
}
function myObj() {
    return {
        a: 123
    }
}
function myObjFnc() {
    return {
        a: function () {
            return "xxx";
        }
    }
}
Validator2(myObjFnc());
console.log(typeof myObjFnc());
////////////////////////////////////////////////////////////
var x = findMax(1, 123, 500, 115, 44, 88);

console.log(x);

function findMax() {
    let max = -Infinity;
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i];
        }
    }
    return max;
}