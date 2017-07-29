<template lang="html">
  <section>
      <div class="sndImg">
        <img src="../assets/sendbg.jpg" alt="" width="300px" height="300px" @mousedown.prevent>
      </div>
      <a href="mailto:crmVip@aliyun.com" class="send_btn">crmVip@aliyun.com</a>
  </section>
</template>

<script>
export default {
  name:'SendEmail'
}
</script>

<style lang="css">
  .sndImg{
    width: 100%;
    height: 300px;
    text-align: center;
    position: absolute;
    top: 70px;
  }
  .send_btn{
    display: block;
    width: 320px;
    height: 40px;
    background: -webkit-linear-gradient(left top, #25ad9f, #4b9bfa);
    color: #fff;
    line-height: 40px;
    text-align: center;
    text-decoration: none;
    position: absolute;
    left:calc(50% - 160px);
    top:360px;
    border-radius: 3px;
    box-shadow: 2px 2px 5px #888888;
  }
</style>
