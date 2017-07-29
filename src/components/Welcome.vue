<template lang="html">
  <div class="welcome">
    <section class="btn-list">
      <a href="javascript:void(0)">
        <img src="../assets/rizhi.png" alt="" width="65px" height="65px">
        <span>我的日志</span>
      </a>
      <a href="javascript:void(0)" @click = "mustor">
        <img src="../assets/kehu.png" alt="" width="65px" height="65px">
        <span>我的客户</span>
      </a>
      <a href="javascript:void(0)">
        <img src="../assets/richeng.png" alt="" width="65px" height="65px">
        <span>我的日程</span>
      </a>
      <a href="javascript:void(0)" @click = "mustor">
        <img src="../assets/huifang.png" alt="" width="65px" height="65px">
        <span>我的回访</span>
      </a>
    </section>
    <section class="count_box">
      <count></count>
    </section>


  </div>
</template>

<script>
import count from './Count'
export default {
  name:'Welcome',
  data(){
    return{
      msg:'我是欢迎页'
    }
  },
  components:{
    count
  },
  methods:{
    mustor(){
      this.$router.push('/List');
    }
  }

}
</script>

<style lang="css">
  .welcome{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .btn-list{
    width: 100%;
    height: 120px;
    background-color: #fff;
    border-top:1px solid #f3f3f3;
  }
  .btn-list a{
    display: block;
    width: 23%;
    height: 72px;
    padding-top: 8px;
    border:1px solid #f3f3f3;
    text-align: center;
    line-height: 72px;
    float: left;
    margin-left: 1.46%;
    margin-top: 20px;
    text-decoration: none;
    color:#000;
    border-radius: 5px;
  }
  .btn-list a span{
    float: right;
    margin-right: 40px;
    margin-top: 5px;
  }
  .count_box{
    border-top:5px solid #f3f3f3;
    width: 98%;
    position: absolute;
    padding:1%;
    background-color: #fff;
    top: 130px;
  }
</style>
