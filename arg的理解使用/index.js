function getArg() {
    console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
    console.log(typeof arguments); // object
    console.log(Array.isArray(arguments)); // false
    console.log(...arguments); // 1 2 3
    // console.log(...arg);
}

function getArg2(a, ...arg) {
    console.log(...arg); // 2 3
    console.log(...arguments); // 1 2 3
    console.log(arguments[0]); // 1
    const b = arguments[1] // 2
    console.log(a); // 1
    console.log(b); // 2
}

function getArg3(...arg) {
    console.log(...arg[0]); // 1 2 3
    console.log({...arg[1]}); // {a: 4, b: 5, c: 6}
    console.log(Array.isArray(...arg[0])); // false
    // console.log(...arg.length); // TypeError: Found non-callable @@iterator
    console.log(arguments.length); // 2
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(...arg); // [1, 2, 3] {a: 4, b: 5, c: 6}
}

// getArg(1, 2, 3)
// getArg2(1, 2, 3)
getArg3([1, 2, 3], {
    a: 4,
    b: 5,
    c: 6
})

