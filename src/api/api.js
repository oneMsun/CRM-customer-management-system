//axios用于提供get数据的一种连接的接口
import axios from 'axios';

let base = '';

//发送用户登录信息验证的请求的方法
export const requestLogin = params => {
  return axios.post(`${base}/login`, params).then(res => res.data);
};

//获取用户列表的请求的方法
export const getUserList = params => {
  return axios.get(`${base}/user/list`, { params: params });
};

//获取用户分页信息的请求的方法
export const getUserListPage = params => {
  return axios.get(`${base}/user/listpage`, { params: params });
};

// 删除用户的请求的方法
export const removeUser = params => {
   return axios.get(`${base}/user/remove`, { params: params });
 };

// 编辑用户信息的请求的方法
export const editUser = params => {
  return axios.get(`${base}/user/edit`, { params: params });
};

// 增加用户信息的请求的方法
export const addUser = params => {
  return axios.get(`${base}/user/add`, { params: params });
};
