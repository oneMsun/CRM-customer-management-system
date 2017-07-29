<template>
    <section class="chart">
        <el-row>
            <el-col :span="12">
                <div id="chartColumn" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'

    export default{
        name:'count',
        data (){
            return {
                chartColumn:null,
                chartPie:null
            }
        },
        mounted:function(){
            var _this=this;
            //基于准备好的dom，初始化echarts实例
            this.chartColumn = echarts.init(document.getElementById('chartColumn'));
            this.chartPie = echarts.init(document.getElementById('chartPie'));

            this.chartColumn.setOption({
                title: { text: '主要客户分布地区' },
                tooltip: {},
                xAxis: {
                    data: ["北京","杭州","上海","天津","黑龙江","广州"]
                },
                yAxis: {},
                series: [{
                    name: '人数分布',
                    type: 'bar',
                    data: [45, 20, 76, 10, 10, 20]
                }]
            });


            this.chartPie.setOption({
                title : {
                    text: '客户活跃分布',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['深圳','杭州','黑龙江','天津','上海']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'深圳'},
                            {value:310, name:'杭州'},
                            {value:234, name:'黑龙江'},
                            {value:135, name:'天津'},
                            {value:1548, name:'上海'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        }

    }
</script>

<style scoped>
    .chart {
        width: 100%;
        float: left;
    }
</style>
