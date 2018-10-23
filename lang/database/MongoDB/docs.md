一、关于权限的默认配置

   在默认情况下，mongod是监听在0.0.0.0之上的，任何客户端都可以直接连接27017，且没有认证。这样做的好处是，用户可以即时上手，不用担心被一堆配置弄的心烦意乱。然而坏处也是显而易见，如果直接在公网服务器上如此搭建MongoDB，那么所有人都可以直接访问并修改数据库数据了。

    默认情况下，mongod也是没有管理员账户的。因此除非你在admin数据库中使用db.addUser()命令添加了管理员帐号，且使用–auth参数启动mongod，否则在数据库中任何人都可以无需认证执行所有命令。包括delete和shutdown。

    此外，mongod还会默认监听28017端口，同样是绑定所有ip。这是一个mongod自带的web监控界面。从中可以获取到数据库当前连接、log、状态、运行系统等信息。如果你开启了–rest参数，甚至可以直接通过web界面查询数据，执行mongod命令。

    其实MongoDB本身有非常详细的安全配置准则，显然开发者也是想到了，然而他是将安全的任务推给用户去解决，这本身的策略就是偏向易用性的，对于安全性，则得靠边站了。


# MongoDB vs MySQL

term                MongoDB             explanation
database            database            数据库
table               collection          表/集合
row                 document            行/文档
column              filed               字段/域
index               index               索引
primaryKey          primaryKey          主键/_id



# 参考文档

http://mongodb.github.io/node-mongodb-native/2.0/api/index.html

http://mongodb.github.io/node-mongodb-native/3.1/api/index.html

https://mongoosejs.com/docs/api.html

