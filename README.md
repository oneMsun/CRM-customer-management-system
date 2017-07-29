# CRM-customer-management-system
使用vue框架制作了集增删改查的CRM客户管理系统
项目名称：crm客户管理系统
项目描述： 
CRM客户管理系统就是一个维护客户关系的系统，这个系统主要是由客户查询，增加，添加，修改这4个大的模块组成。系统选择vue框架编写，选择的理由是相比以往的mvc框架，而vue的mvvm框架更轻便，更容易对数据的操作，而vue采用的是双向数据绑定，即修改视图会影响数据，操作数据也会影响相应的视图。
系统操作流程：
1、打开crm系统的文件的控制台 安装依赖：npm install
2、依赖安装成功后 输入：npm run dev 运行系统
3、当前打开的是登录页面，直接点击确定进入crm系统，点击左侧menu菜单可以参看系统每个页面，点击退出按钮直接退出系统登录
遇到的技术难点以及解决方案： 
1、开发工具的选择：
直接选用vue官方的脚手架工具cli ，通过包管理器npm 直接安装cli
2、组件模块划分：
根据crm需求具体分为：登录组件，首页组件，数据列表组件，图标组件，日历组件，邮件发送组件等
3、组件之间访问方式：
在vue中组件访问使用的方式是route，通过声明router以完成组件之间的访问，在首页组件中，在左侧menu中使用了路由跳转以此来完成每个子组件中间的切换。
4、安装相应的依赖：
页面布局用的是element-ui; 页面图标渲染用的是font-awesome； 页面跳转用的是vue-router； 图标统计工具用的是echarts
请求数据用的是axios 和 axios-mock-adapter ； 随机生成数据用的是mockjs； 日历插件用的是vue-simplemde
5、模拟后台访问数据
使用mock.js模拟出登录验证数据LoginUsers和渲染数据Users（每条数据由id,name,addr,age,birth,sex组成），然后使用axios和axios模拟器axios-mock-adapter模拟后台处理数据，具体处理数据分为用户登录数据的校验操作，渲染列表数据操作，增加数据操作，删除数据操作，修改数据等操作；通过声明一个api文件的接口，方便组件请求相应的数据接口进行视图操作。
6、登录验证问题
用户登录需要输入用户名和密码，当输入完成后点击提交按钮，登录组件会通过api接口里的requestLogin方法向服务器发送数据，当服务器接收到数据后会与服务器中已经存储好的LoginUsers数据进行比对校验，当校验完成后，登录组件会通过requestLogin的then方法获取服务器校验比对的结果，以此来完成登录页面路由跳转的操作。
7、渲染列表的问题
在页面渲染的组件list中声明一个数据data，并且在列表中绑定这个数据data，点击menu中“我的客户”list组件会通过api中的getUserListPage的方法来获取相应的data的条数和相应的渲染的数据
8、数据的查询和删除问题
在vue中数据和视图是双向绑定的，这就意味着操作数据就会影响视图，操作视图也会影响数据，在查询数据的时候，获取到要查询的这个客户的名字，并且把这个名字信息发送到服务器中，而服务器会把这个查询的名字在Users数据中用分filter的方法过滤出来，再把过滤出来的数据返回给list组件以此完成查询，删除操作同理。
9、数据的增加和修改问题
通过点击修改按钮，通过api的中editUser的方法把修改的数据发给服务器，服务器通过id识别具体修改的哪条数据，然后使用push的方法来重置数据，重置完成后再返回给组件以此完成页面修改，增加操作同理，只是去掉的了服务器拿到数据比对id的操作。
