<template>
  <div class="table_list">
    <section class="path_box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的客户</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <section class="table_list_content">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="margin-top: 20px">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="请输入客户姓名" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="getUsers" icon="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="handleAdd" icon="plus">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <e-col class="list_content">
        <el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120" sortable></el-table-column>
          <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable></el-table-column>
          <el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
          <el-table-column prop="birth" label="生日" width="120" sortable></el-table-column>
          <el-table-column prop="addr" label="地址" min-width="180" sortable></el-table-column>
          <el-table-column inline-template :context="_self" label="操作" width="150">
            <span>
              <el-button size="small" @click="handleEdit(row)" >编辑</el-button>
              <el-button type="danger" size="small" @click="handleDel(row)" >删除</el-button>
            </span>
          </el-table-column>
        </el-table>
      </e-col>

      <!--分页-->
      <el-col :span="24" class="page">
        <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="total"
        style="float:right;"
        >
        </el-pagination>
      </el-col>

      <!--编辑界面-->
      <el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="editForm.sex">
              <el-radio class="radio" :label="1">男</el-radio>
              <el-radio class="radio" :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="editForm.addr"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取 消</el-button>
          <el-button
          type="primary"
          @click.native="editSubmit"
          :loading="editLoading"
          >{{btnEditText}}</el-button>
        </div>
      </el-dialog>
    </section>

  </div>

</template>
<script>
	import util from '../common/util'
	import { getUserListPage, removeUser, editUser, addUser } from '../api/api';

	export default {
    name:'List',
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				editFormVisible: false,//编辑界面显是否显示
				editFormTtile: '编辑',//编辑界面标题
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				editLoading: false,
				btnEditText: '提 交',
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
				});
			},
			//删除
			handleDel: function (row) {
				var _this = this;
				this.$confirm('确认删除该记录吗?', '提示', {
				}).then(() => {
					_this.listLoading = true;
					let para = { id: row.id };
					removeUser(para).then((res) => {
						_this.listLoading = false;
						_this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						_this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (row) {
				this.editFormVisible = true;
				this.editFormTtile = '编辑';
				this.editForm.id = row.id;
				this.editForm.name = row.name;
				this.editForm.sex = row.sex;
				this.editForm.age = row.age;
				this.editForm.birth = row.birth;
				this.editForm.addr = row.addr;
			},
			//编辑 or 新增
			editSubmit: function () {
				var _this = this;
				_this.$refs.editForm.validate((valid) => {
					if (valid) {
						_this.$confirm('确认提交吗？', '提示', {}).then(() => {
						_this.editLoading = true;
						_this.btnEditText = '提交中';
							if (_this.editForm.id == 0) {
								//新增
								let para = {
									name: _this.editForm.name,
									sex: _this.editForm.sex,
									age: _this.editForm.age,
									birth: _this.editForm.birth == '' ? '' : util.formatDate.format(new Date(_this.editForm.birth), 'yyyy-MM-dd'),
									addr: _this.editForm.addr,
								};
								addUser(para).then((res) => {
									_this.editLoading = false;
									_this.btnEditText = '提 交';
									_this.$notify({
										title: '成功',
										message: '提交成功',
										type: 'success'
									});
									_this.editFormVisible = false;
									_this.getUsers();
								});
							} else {
								//编辑
								let para = {
									id: _this.editForm.id,
									name: _this.editForm.name,
									sex: _this.editForm.sex,
									age: _this.editForm.age,
									birth: _this.editForm.birth == '' ? '' : util.formatDate.format(new Date(_this.editForm.birth), 'yyyy-MM-dd'),
									addr: _this.editForm.addr,
								};
								editUser(para).then((res) => {
									_this.editLoading = false;
									_this.btnEditText = '提 交';
									_this.$notify({
										title: '成功',
										message: '提交成功',
										type: 'success'
									});
									_this.editFormVisible = false;
									_this.getUsers();
								});
							}
						});
					}
				});
			},
			//显示新增界面
			handleAdd: function () {
				var _this = this;
				this.editFormVisible = true;
				this.editFormTtile = '新增';
				this.editForm.id = 0;
				this.editForm.name = '';
				this.editForm.sex = 1;
				this.editForm.age = 0;
				this.editForm.birth = '';
				this.editForm.addr = '';
			}
		},
		mounted() {
			this.getUsers();
		}
	}
</script>

<style lang="css">
  .path_box{
    width: calc(100% - 24px);
    position: absolute;
    z-index: 999;
    background-color: #fff;
    padding: 18px 12px;
    border-top:1px solid #f3f3f3;
    border-bottom:1px solid #f3f3f3;
  }
  .table_list_content{
    background-color: #fff;
    width: calc(100% - 24px);
    padding: 0px 12px 12px 12px;
    position: absolute;
    top: 50px;
  }
  .page{
    float:right;
    margin-top: 12px;
  }
  .list_content{
    float: left;
    margin-top: -28px;
  }

</style>
