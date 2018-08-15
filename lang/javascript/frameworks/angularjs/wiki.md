
# Documentation

[ng api](https://docs.angularjs.org/api)


# Developer Guide

## Directives

- 什么是``Directives``
- ``Directives`` ``Matching``
- ``Normalization`` 归一
    Strip `x-` and `data-` from the front of the element/attributes.
    Convert the `:`, `-`, or `_`-delimited name to camelCase.
- ``Directive``类型
  $compile match 4 types by using `restrict`:
    E(Element name)
    A(Attributes)
    C(Class names)
    M(Comments)
- 注册指令
    和`controller`一样，`directive`也是注册在`module`上
    template: inline的模板字符串
    templateUrl: 引入的html模板，可以接受函数
    scope: 和React中的props一样的东西，定义`directive`可以接受的参数。
        定义此属性后`directive`无法访问scope外但是在controller中定义的值。
        scope为{}，那么该directive的scope就会提升到上层controller中的scope.
        http://blog.krawaller.se/posts/dissecting-bindings-in-angularjs/
        ```
            scope: {
                customer: '=',   // 模板中的绑定和controller中的绑定值名字一样
                close: '&onClose'   //  允许onClose表达式、函数在其定义时的scope下运行
                title: '@   // creates an inner variable populated with the string content of the named attribute. You could say it serves as an initial config of the component.
            }
        ```
    link(scope, element, attrs, controller, transcludeFn): 操作DOM，在template上注册事件
        ```
            link: function(scope, element, attrs, controller, transcludeFn) {
                // scope: angularjs scope object,上层controller下的scope
                // element: jqLite-wrapped element that this directive matches
                // attrs： a hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
                // controller: the directive's required controller instance(s) or its own controller (if any). The exact value depends on the directive's require property.
                // transcludeFn: a transclude linking function pre-bound to the correct transclusion scope.
            }
        ```
    cleanUp: element.on('$destroy', ...) or scope.$on('$destroy', ...)
    transclude: transclude makes the contents of a directive with this option have access to the scope outside of the directive rather than inside. 让directive内部children的scope不属于directive，而受controller控制
        transclude的名称由directive-slotname表示, 详见https://plnkr.co/edit/?p=preview
        ```
            transclude: {
                title: '?paneTitle',
                body: 'paneBody',
                footer: '?paneFooter'
            }
        ```
    require: 该directive必须在指定的directive出现下才能运行
        ```
            require: 'myTabs'   // self only
            require: '^myTabs'  // parent || self
            require: '^^myTabs' // parent only
            require: ['^^myTabs', 'myPane;]
        ```
    controller: attaches a controller to the template of the directive
        use controller when you want to expose an API to other directives. Otherwise use link.
    controllerAs: 
- 
# API Reference

## ng Directives 

- ngTransclude: 相当于Vue中的slot这种东西
# Stackoverflow
https://stackoverflow.com/questions/17144180/angularjs-loading-screen-on-ajax-request

https://stackoverflow.com/questions/35999072/what-is-the-equivalent-of-bluebird-promise-finally-in-native-es6-promises


https://www.jeffryhouser.com/index.cfm/2014/6/2/How-do-I-run-code-when-a-variable-changes-with-AngularJS


# x

- $scope与this的区别
    $scope是template编译之后，一个作用域；在编译期间，this指向directive本身
    在编译期间，在this上绑定函数，由于是在directive本身(return的那个对象{template:,link:,...})，实际没啥作用。
    在$scope上绑定函数，函数中的this是$childScope
- compile,link和controller的关系
    https://stackoverflow.com/questions/15676614/link-vs-compile-vs-controller
- 在template阶段不要操作controller中的值，可能引起意外的bug，比如在v-if中对$scope中的变量赋值，导致后续v-modle不生效的bug.
- ng-change的问题
    https://stackoverflow.com/questions/24802627/angular-ng-change-not-firing-when-ng-model-is-changed
- directive_scope问题
    https://docs.angularjs.org/api/ng/service/$compile#-scope-