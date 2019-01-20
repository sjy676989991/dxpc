<template>
    <div>
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
            <el-col :span="24">
                <el-card>
                    <div slot="header">
                        <span>日发送统计</span>
                    </div>

                </el-card>
            </el-col>
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

    export default {
        name: "Dashboard",
        data() {
            return {
                balance:      "",  //余额
                smsCount:   "",  //行业条数
                makSmsCount:     "",   // 营销条数
                creditLine: "", //授信
                data: [
                    {
                        date: "2018-1-1",
                        value: Math.ceil(Math.random() * 10)
                    },
                    {
                        date: "2018-1-2",
                        value:  (Math.random() * 10)
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
                orderChart: null
            };
        },
        methods: {
            /**
             * 获取用户余额
             */
            getUserBalance(){
                this.$http.get('platform/v1/userBalance').then(res => {
                    const data = res.data;
                    if( data.code != '00')
                    {
                        return this.$message.error(data.message);
                    }
                    this.balance = data.data.balance;
                    this.smsCount = data.data.smsCount;
                    this.makSmsCount = data.data.makSmsCount;
                    this.creditLine = data.data.creditLine;

                })
            }
        },
        mounted() {
            this.getUserBalance();
        }
    };
</script>