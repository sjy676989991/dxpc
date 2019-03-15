<template>
    <div>
        <el-row>
            <div class="findx">
                <span style="margin-right: 20px">短信功能需要开发者认证后使用</span>
                <el-button v-if="this.intrue" type="primary">已认证</el-button>
                <el-button v-else type="primary" @click="gomess">去认证</el-button>
            </div>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>当前余额</span>
                    </div>
                    <div>
                        <div id="userChart" style="font-size: 30px">{{balance}}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>行业短信条数</span>
                    </div>
                    <div>
                        <div id="uvChart" style="font-size: 30px">{{smsCount}}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>营销条数</span>
                    </div>
                    <div>
                        <div id="pvChart" style="font-size: 30px">{{makSmsCount}}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>授信（条）</span>
                    </div>
                    <div>
                        <div id="orderChart" style="font-size: 30px">{{creditLine}}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-card>
                <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">
                </div>
            </el-card>
        </el-row>
    </div>
</template>
<style lang="scss">
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
</style>
<script>
    import echarts from 'echarts'

    export default {
        name: "Dashboard",
        props: {
            className: {
                type: String,
                default: 'yourClassName'
            },
            id: {
                type: String,
                default: 'yourID'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '500px'
            }
        },
        data() {
            return {
                balance: "",  //余额
                smsCount: "",  //行业条数
                makSmsCount: "",   // 营销条数
                creditLine: "", //授信

                data: [
                    {
                        date: "2018-1-1",
                        value: Math.ceil(Math.random() * 10)
                    },
                    {
                        date: "2018-1-2",
                        value: (Math.random() * 10)
                    },
                    {
                        date: "2018-1-3",
                        value: Math.ceil(Math.random() * 10)
                    },
                    {
                        date: "2018-1-4",
                        value: Math.ceil(Math.random() * 10)
                    },
                    {
                        date: "2018-1-5",
                        value: Math.ceil(Math.random() * 10)
                    },
                    {
                        date: "2018-1-6",
                        value: Math.ceil(Math.random() * 10)
                    },
                    {
                        date: "2018-1-7",
                        value: Math.ceil(Math.random() * 10)
                    }
                ],
                userChart: null,
                uvChart: null,
                pvChart: null,
                orderChart: null,
                intrue: '',
                xAxis: '',
                yAxissucc: '',
                yAxissend: '',
                yAxiserr: '',
            };
        },
        methods: {
            /**
             * 获取用户余额
             */
            getUserBalance() {
                this.$http.get('platform/v1/userBalance').then(res => {
                    const data = res.data;
                    if (data.code != '00') {
                        return this.$message.error(data.message);
                    }
                    this.balance = data.data.balance;
                    this.smsCount = data.data.smsCount;
                    this.makSmsCount = data.data.makSmsCount;
                    this.creditLine = data.data.creditLine;

                })
            },
            getUser() {
                this.$http.get('/platform/v1/userInfo').then(res => {
                    // console.log(res)
                    const data = res.data;
                    if (data.code != '00') {
                        return this.$message.error(data.message);
                    }

                    this.intrue = data.data.developerAudit
                })
            },
            gomess() {
                this.$router.push({path: "/person"});
            },
            initChart() {
                console.log(this.xAxis)

                this.chart = echarts.init(this.$refs.myEchart);
                // 把配置和数据放这里
                this.$http.get('/platform/v1/day').then(res => {
                    console.log(res)
                    const data = res.data;
                    this.xAxis = data.xAxis
                    this.yAxissucc=data.success
                    this.yAxissend=data.sending
                    this.yAxiserr=data.fail
                    this.chart.setOption({
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        legend: {
                            data: ['发送成功', '发送中', '发送失败']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: this.xAxis,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }],
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: '发送成功',
                                type: 'line',
                                stack: '总量',
                                data: this.yAxissucc
                            },
                            {
                                name: '发送中',
                                type: 'line',
                                stack: '总量',
                                data: this.yAxissend
                            },
                            {
                                name: '发送失败',
                                type: 'line',
                                stack: '总量',
                                data: this.yAxiserr
                            },

                        ]
                    })
                })
            }
        },
        mounted() {

            this.getUserBalance();
            this.getUser()
            this.initChart();
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose();
            this.chart = null;
        },
    };
</script>
<style scoped lang="scss">
    .elinput {
        margin-top: 20px;
    }

    .avatar-uploader {

    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .findx {
        width: 100%;
        text-align: right;
        font-size: 16px;
    }
</style>