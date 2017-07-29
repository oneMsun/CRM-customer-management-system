// user.js页面用于提供初始账号密码，并将其导入mock.js中

// 在使用mock.js时候 需要引入mockjs模块
import Mock from 'mockjs';


//声明一个常量用来存储登录用户初始的账号和密码
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: '',
    name: '张某某'
  }
];

//声明一个用户存储数据的数组，
const Users = [];

//定义要生成数据的条数为86条执行for循环生成数据
for (let i = 0; i < 86; i++) {
  //通过Mock.mock()方法所生成的数据由id，姓名，地区，生日，地区
  Users.push(Mock.mock({
    /**
     * Random.guid()用来随机生成GUID，GUID是一种标识符，
     * 在理想情况下，任何计算机和计算机集群都不会生成两个相同的GUID
     * 所有用这种方式生成id最好不过了
     */
    id: Mock.Random.guid(),

    /**
     *Random.chineseName()可以简写成Random.cname()
     *随机生成一个常见的中文姓名。
     */
    name: Mock.Random.cname(),

    //mock('@county(true)')使用了数据模板，随机生成地址
    addr: Mock.mock('@county(true)'),

    //生成大于等于18到小于等于60的数，其中后面的“1”为确定类型
    'age|18-60': 1,

    //Random.date()返回一个随机的时间字符串
    birth: Mock.Random.date(),

    //Random.integer(0, 1)返回一个是0或者1的整数
    sex: Mock.Random.integer(0, 1)
  }));
}

//输出生成好的两个数据LoginUsers 和 Users
export { LoginUsers, Users };
