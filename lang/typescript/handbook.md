# Basic Types

- Boolean
    ```
    let isDone: boolean = false;
    ```
- Number
    ```
    let decimal: number = 6;
    ```
- String

    支持template string
    ```
    let color: string = 'blue';
    color = "red";
    ```
- Array
    ```
    let list: number[] = [1, 2, 3];
    let list: Array<number> = [1, 2, 3];
    ```
- Tuple(union type)
    ```
    let x: [string, number];
    x = ['hello', 10];
    x[2] = 100;
    ```
- Enum(枚举)
    ```
    enum Color {Red, Green = 2, Blue};
    let c: Color = Color.Red;   // 0
    let colorName: string = Color[3];   // "Blue"
    ```
- Any
    ```
    let notSure: any = 4;
    notSure = "maybe a string instead";
    notSure = false; // okay, definitely a boolean
    ```

    ```
    let list: any[] = [1, true, "free"];

    list[1] = 100;
    ```
- Void
    ```
    let unusable: void = undefined; // undefined | null
    ```

- Null and Undefined
    ```
    // Not much else we can assign to these variables!
    let u: undefined = undefined;
    let n: null = null;
    ```
- Never
- Object

    any thing that is not number, string, boolean, symbol, null, or undefined.
    ```
    declare function create(o: object | null): void;

    create({ prop: 0 }); // OK
    create(null); // OK

    create(42); // Error
    create("string"); // Error
    create(false); // Error
    create(undefined); // Error
    ```

- Type assertions类型推导(断言)，type cast
    ```
    let someValue: any = "this is a string";

    let strLength: number = (<string>someValue).length;
    ```

    ```
    let someValue: any = "this is a string";

    let strLength: number = (someValue as string).length;
    ```

# Variable Declaration

var、let和const，基本和JavaScript类似

```
    function f(condition, x) {
        if (condition) {
            let x = 100;
            return x;
        }

        return x;
    }

    f(false, 0); // returns '0'
    f(true, 0);  // returns '100'
```


Shadowing， 作用域屏蔽
```
function sumMatrix(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
```


作用域
```
for (let i = 0; i < 10 ; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```

## 解构(Destructure)

```
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2
```


```
function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
f([1, 2]);
```

```
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
```

```
let [, second, , fourth] = [1, 2, 3, 4];
```



```
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;
```



- Property renaming

```
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a: newName1, b: newName2 } = o;   // newName1为'foo'
```

- default values
```
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}
```


- function declaration

```
type C = { a: string, b?: number }
function f({ a, b }: C): void {
    // ...
}
```


```
function f({ a="", b=0 } = {}): void {
    // ...
}
f();

```


## 展开(Spread)

```
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];
```





# Interface



- optional properties

```
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "white", area: 100};
    if (config.clor) {
        // Error: Property 'clor' does not exist on type 'SquareConfig'
        newSquare.color = config.clor;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});

```


- Readonly properties

```
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!

```



- Excess Property Checks

```
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}


```


- Funtion Types

```
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```


- Indexable Types

```
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

```


```
interface StringArray {
    [key: string]: string;
}

let myArray: StringArray;
myArray = {
    a: 'bb',
    c: 'dd'
}

let myStr: string = myArray.a;

```




```
interface NumberDictionary {
    [index: string]: number;
    length: number;    // ok, length is a number
    name: string;      // error, the type of 'name' is not a subtype of the indexer
}
```


- Class Types


Interfaces describe the public side of the class, rather than both the public and private side. 


```
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}

```



```
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}

```




- Extending Interfaces

```
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

```



# Classes




