<template lang="html">
    <section class="calendar">
      <vue-event-calendar :events="demoEvents" style="height:500px" class="aa"></vue-event-calendar>
    </section>
</template>

<script>
export default {
  name:'calendarplus',
  data () {
    return {
      demoEvents: [{
        date: '2016/12/15',
        title: '客户回访状况',
        desc: '上海客户二次回访，客户有购买意向'
      },{
        date: '2016/11/12',
        title: '年底拜访客户记录',
        desc: '年底拜访客户增加客户的粘度'
      }]
    }
  }
}
</script>

<style lang="css">
  .aa{
    height: 400px;
    position: absolute;
    top: 40px;
    right: 20px;

  }
</style>
