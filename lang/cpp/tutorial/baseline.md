- 标准库ref: http://www.cplusplus.com/reference/
            http://zh.cppreference.com/w/cpp/header
- memory_layout_of_a_process: https://www.geeksforgeeks.org/memory-layout-of-c-program/



- 在每个声明语句中只声明一个变量，并提供说明该变量在程序中用途的注释
- 变量名尽量避免使用下划线或者双下划綫，因为C++编译器可能采用类似的名字为其内部的某些用途提供服务
- std::endl一是换行，二是刷新输出缓冲区
- 变量标识符与内存的关系
- 运算符、优先级、结合律
- using std::cout using指令的使用
- 在类定义后面忘记添加一个分号是语法错误
- 类成员函数使用const末尾修饰的含义(函数头部 function header): 该函数不修改而且不应该修改调用该函数的实例(对象)
- 始终设法控制数据成员的改变所影响的范围，采用get函数与set函数来访问和操作数据成员
- 如果用户没有显示定义构造函数，那么C++编译器会为类提供默认的构造函数实现，一般就是一个空函数，没有对类中的成员作初始化
- 除非不初始化成员变量，否则请一定提供构造函数
- 调用cmath中的sqrt(-900)函数，如果参数为负数，那么全局变量`errno`会被设置为全局常量`EDOM`
- C++标准没有规定函数形参如何获得实参的顺序，这一部分由编译器厂商实现，但是函数在调用之前，一定会确保形参有值。
- C++编译器会检查函数的原型与调用的位置是否匹配，如果不匹配会发生编译错误。这里的匹配包括：参数个数，参数类型，参数顺序，返回值等。其中参数类型可以发生隐式转换
- C++中，函数的使用必须要先知道其函数原型，除非在调用函数之前已经定义了函数。常见的通过include头文件的形式，就是在引入函数原型。如果是定义的函数，那么该定义同时可以作为函数原型，这样单独的函数原型就没有必要。如果函数在定义之前被调用，而且没有函数原型，那么就会发生编译错误。
- 尽量总是提供函数原型，因为函数定义虽然可以作为函数原型使用，但是这隐式严格的规定了函数的定义位置，程序灵活性降低。
- 函数签名： 函数名+形参列表，没有函数返回值。同一作用域内的函数必须拥有不同的函数签名
- 函数重载： 函数名相同，函数签名不同(参数类型，参数顺序)，函数重载的作用在于相同任务但是不同的参数。函数重载机制是编译器的一项工作，编译器会根据函数签名改编函数名称，这样就能区分重载函数了。 ch06.project13
- 函数模板 ch06.project14
    尾随返回值类型trailing return type。auto ->
- 一元作用域分辨运算符 `::`运算符可以访问局部作用于外同名的全局变量,如果程序中需要引入全局变量，应该始终使用`::`这样就会一目了然的知道这是一个全局变量 ch06.project12
- C++中唯一指定的有顺序的运算符是： &&、||、,、:?共四种。
- C++标准中，size_t表示的是一种无符号整型。建议任何表示array对象大小和下标的变量都采用这个类型。该类型定义于 cstddef头文件中。
- const关键字用于声明一个常量变量(命名常量、只读变量)，之后再也不能修改该变量。对const声明的变量修改会产生一个编译错误, error: assignment of read-only variable 'y'。对const声明的变量没有初始化会产生一个编译错误，error: uninitialized const 'z' [-fpermissive]。 ch07.project02
- 对array对象使用static关键字修饰，使得array对象不会在每次调用函数的时候都进行数组的创建和初始化，也不会在每次函数调用完毕后销毁，这样在使用大型array对象时，可以有效提高程序性能。 ch07.project05
- C++11 基于范围的for语法可以有效规避下标越界问题,这种语法可以应用于大多数容器，包括array和vector。 ch07.project06
    基于范围的for的深层理解
        for (auto item: items)
        for (auto &item: items)
    基于范围的for如果遍历使用普通变量，会发生赋值操作；如果使用引用变量，就会使用引用，可以改变容器中的值。
- C++中成员变量的初始化，必须使用static const修饰
- 引用传参可以有效降低程序的消耗，避免按值传参的缺点。而引用传参中为了避免错误地改变原有值，可以使用const修饰，在编译期间就可以发现问题。  `error: assignment of read-only location '(& gradesArray)->std::array<int, 10>::operator[](0)'`
- C++11 auto关键字用于通知编译器根据这个变量的初始化值来确定它的数据类型,IDE中，鼠标移到变量上会提示该变量的类型。 ch07.project09
- vector模板在我的理解中就是数组。
    vector和array的显著区别如下：
        vector动态大小，array必须重新分配内存，再将成员赋值
        vector可以赋值、初始化另一个vector，array不能初始化另一个数组，也不能赋值
        
        array在定义的时候，必须给定数组元素的个数
- 指针
    声明必须分开，不可以一起声明： `int *countPtr, *numberPtr;`,指针变量名中包含Ptr是一个好的代码风格
    指针在初始化或赋值的时候应该被初始化为nullptr(C++11空指针)，在C++11之前，空指针有两种表现方式：NULL和0
    指针运算符： &(取地址运算符)、*(dereference 间接运算符，返回左值)
- 内置数组
    默认初始化： 数值类型为0，bool类型为false，指针类型设置为nullptr，类对象被默认构造函数初始化
    内置数组作为参数： 内置数组的名字可以隐式地转换为这个数组的第一个元素的内存地址，如果数组名称为arrayName则作为参数会转换为&arrayName[0]。
    const限定： 指针名称作为参数名可能会发生意想不到的结果，所以使用const限定符可以防止意外的修改数组内容
    interator: 在头文件<iterator>中，也定义了内置数组的相关操作，比如`begin(array)`和`end(array)`可以返回数组的首尾地址
    内置数组局限性： 无法使用关系和比较运算符比较；不能互相赋值；不知道自己的大小，必须传递大小给函数才能正常操作数组；没有边界检查的功能。
    必须使用内置数组的场景： 命令行参数；
- const关键字: https://www.cnblogs.com/chogen/p/4574118.html
    修饰常量：
        `int const a = 10`
        `const int a = 10`
        以上二者的作用一样，都表示a变量不可以发生修改
    修饰指针：
        如果const位于*的左侧，则const就是用来修饰指针所指向的变量，即指针指向为常量
        如果const位于*的右侧，const就是修饰指针本身，即指针本身是常量        
        `int a = 10; const int *aPtr = &a`: 指针aPtr指向的变量a的值不可以改变
        `int a = 10; int const *aPtr = &a`: 指针aPtr指向的变量a的值不可以改变
        `int a = 10; int * const aPtr = &a`:指针aPtr指向的变量a的值可以改变，指针本身的值不可以改变。
        `int a = 10; const int * const aPtr = &a`:指针aPtr指向的变量a的值和指针本身都不可以变
        `int a = 10; int const * const aPtr = &a`:指针aPtr指向的变量a的值可以改变，指针本身的值不可以改变。
    修饰引用：
        `int a = 10; const int & aRef = a`; 引用指向的变量不可修改
        `int a = 10; int const & aRef = a`; 引用指向的变量不可修改
    修饰函数参数：
        和修饰常量和指针的含义一样,修饰的不可变对象在函数中不可以发生改变
    修饰函数返回值：
        和修饰常量和指针的含义一样

- sizeof关键字：
    sizeof关键字在程序编译期间，确定内置数组，或者其他任意数据类型、变量或常量的字节大小。
    指针大小： 32位、64位指的是CPU的字长，也就是说CPU可以一次根据寄存器的值，寻找内存中的数据的能力。32位就意味着寄存器的最大值为4字节，64位就意味着最大为8字节，所以CPU能够寻址2^64内存大小。如果用位来描述地址大小，那么起码要64位二进制才能刚好描述完2^64的地址大小，所以一个地址大小是64位。
        当然，一个程序具体的指针大小和编译选项和运行平台有关。
    数组： sizeof作用在数组明上的时候，此时的数组名并不会按照指针来运行，而是会返回数组占用内存区域的大小(不管是一维数组，还是多维数组)。
-----------------
数据结构
# array

-----------------
类型与精度
unsigned long/unsigned long int: 至少和unsigned int一样大，最少4字节
unsigned long long/unsigned long long int: 能够在一些系统上用8字节表示

-----------------

![memory-layout](https://cdncontribute.geeksforgeeks.org/wp-content/uploads/memoryLayoutC.jpg)

-----------------
标准库
iostream
iomanip
cmath
cstdlib
ctime       处理时间和日期的函数原型
<array> <vector> <list> <forward_list> <deque> <queue>          
<stack> <map> <unordered_map> <unordered_set> <set> <bitset>    
    C++容器
cctype  测试字符特定属性
cstring C风格字符串
typeinfo    运行时类型识别
exception stdexcept
memory      C++标准库容器的内存分配
fstream     文件处理
string      字符串
sstream     内存字符串输入输出
functional  算法
iterator    容器操作
algorithm   容器操作
cassert     诊断断言
cfloat      系统浮点数长度限制
climits     系统整数长度限制
cstdio      C风格标准输入输出
locale      语言处理
limits      各平台数字类型限制
utility     基础设施函数
random      随机函数
-----------------
随机函数ch06.project06

rand
srand(seed)
```
default_random_engine engine(static_cast<unsigned int>(time(0)));
uniform_int_distribution<unsigned int> randomInt(1,6);      // 类模板
for (unsigned int counter = 1;counter <= 10; ++counter) {

    cout << setw(10) << randomInt(engine);
    if (counter % 5 == 0) {
        cout << endl;
    }
}
```
-----------------
存储类别 auto、register、extern、mutable、static、thread_local
存储期  标识符的存储期决定了变量在内存中存在的时间，有些标识符存在时间较短，有些标识符可以重复的创建和销毁，还有些标识符在程序整个生命周期存在。
    自动存储期： 标识符在程序执行到它的位置时创建，在语句块活动时存在，程序退出语句块销毁
        声明在函数中的局部变量
        函数形参
        register声明的局部变量或者形参
            register用于放在自动变量声明前，用于建议编译器在寄存器而不是内存中保存该变量。
            register只是建议，具体执行的时候是否被分配寄存器，看情况
            如今的编译器都很智能，一般不需要手动添加register关键字建议编译器该怎么做。如果开销大，编译器自然会放到寄存器中去。
    静态存储期： 标识符在程序开始到结束一直存在于内存中。
        
        extern和static关键字用于标识静态存储期的标识符。
        extern和static声明时，便会进行一次初始化。对于函数而言，程序一开始执行，这种函数就存在，但是不一定就可以访问，这个和作用域有关
        全局变量在函数和类之外创建，全局变量在程序整个生命周期存在，全局变量和全局函数可以被源文件中位于其声明或定义之后的任何函数引用。见ch06.project07
        static声明的局部变量仅被其声明的函数所知(其他作用于无法访问)，但是与自动变量不同的是，static变量在函数调用返回给调用者之后，该变量仍然存在，在下一次调用该函数时，该变量的值是上次调用该函数的最后一次的值。ch06.project08
    动态存储期
    线程存储期
作用域scope 标识符在程序中哪些位置可以引用，有些全局可以引用，有些则限定在某一区域
链接linkage 标识符的链接决定了标识符是只在声明它的源文件中可以识别，还是在经编译后链接在一起的多个文件中可以识别。标识符的存储类别说明符用于确定存储类别和链接



-----------------
作用域

语句块作用域

函数作用域

全局命名空间作用域global namespace scope
    类或函数之外的标识符

函数原型作用域functional prototype scope1
    原型参数列表被编译器忽略，其他地方可以任意使用而不用担心冲突
类作用域

命名空间作用域


-----------------
函数调用栈

嵌套的函数每一调用都会有一个 栈帧(stack frame/activated record) 分配，寄存器stack pointer总是指向栈顶，
stack frame[x]
    return address
    function parameter
    local variable
        以上两种为自动变量
    ...


stack frame[0]/main function    操作系统控制main函数的return address
    return address
    function parameter
    local variable
        以上两种为自动变量
    ...

-----------------
内联函数

函数调用存在开销，在程序执行时，发生函数调用，那么程序会首先为这个函数分配一个stack frame，保存寄存器等，存在开销，远远没有直接执行语句快，所以C++中，提供了把函数定义为执行块的功能，这就是内联函数。
内联的意思就是说在调用的时候，相当于把函数展开了，直接就地执行函数中的语句，而不是开一个stack frame去调用。

内联函数只能定义，不能声明。

```
int max(int,int);
inline int max(int a,int b) {
    return a > b ? a : b;
}
```
-----------------
形参|实参与值传递(pass by value)|引用传递(pass by reference)

引用传递性能非常好，因为不需要按值传递那样大量复制数据所带来的开销
引用传递会削弱程序的安全性，因为它可能改变传入参数的值



-----------------
引用reference

- 引用作为函数参数
- 引用作为函数内变量
- 引用作为返回值，引用必须引用一个static变量

-----------------
-----------------
-----------------
枚举

enum Month {Jan=1,Feb,Mar,Apri,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec};
Month month = Jan;  // 1

C++11作用域枚举
enum class Month : unsigned int {Jan=10,Feb,Mar,Apri};
Month month = Month::Apri;
-----------------

- 空(无实参)构造函数
    1. 编译器提供的，不会对类成员初始化，垃圾值
    2. 显式构造函数，可以初始化成员和某些初始化任务
    3. 如果有实参构造函数，默认不会创建空构造函数
- explict关键字用于 类构造函数只有一个参数的情况，用于避免默认隐式构造函数存在的副作用，详见：https://www.cnblogs.com/ymy124/p/3632634.html
- 初始化
    成员初始化列表 (string name,string time) :coursename(name),coursetime(time) {}