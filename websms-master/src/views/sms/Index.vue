<template>
    <div>
        <el-form :model="forms" status-icon :rules="rules" ref="ruleForm" label-width="100px">
            <el-card  style="margin-bottom:10px;">
                <div class="sendt">
                    <div class="sendup">上传手机号文件</div>
                    <el-button type="primary">选择文件</el-button> <span status="success" class="senrname">未选择文件</span>
                    <p class="sendpl">请先点击链接，然后右键“目标另存为”下载</p>
                    <p class="sendax">
                        <!--<a href="../../assets/phoneTemplate.xlsx" download="../../assets/phoneTemplate.xlsx">.xlsx模板下载</a>-->
                        <a href="../../assets/logo.png" download="png">.txt模板下载</a>
                    </p>
                </div>
            </el-card>

            <el-card style="margin-bottom:10px;">

                <el-form-item label="充值条数" prop="smsCount">
                    <el-input type="number" v-model="forms.smsCount" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="短信内容" prop="unitPrice">
                    <el-input type="textarea" v-model="forms.smsContent" autocomplete="off"></el-input>
                </el-form-item>


                <el-form-item label="定时发送" prop="type">
                    <el-radio-group v-model="forms.type" size="medium">
                        <el-radio border label="行业"></el-radio>
                        <el-radio border label="营销"></el-radio>
                    </el-radio-group>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="sendBtn" logining>发送短信</el-button>
                </el-form-item>


            </el-card>
        </el-form>

    </div>
</template>


<script>
    export default {
        name: "recharge",
        components: {},
        data() {
            return {
                forms: {
                    smsCount: '',
                    unitPrice: '',
                    type: '0',
                    money: '',
                    payWay: '',
                    smsContent: ''
                },
                rules: {
                    smsCount: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                        {min: 11, message: '至少需要输入一个手机号', trigger: 'blur'}
                    ],
                    unitPrice: [
                        {required: true, message: '请输入短信内容', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {

            // 载入数据
            loadData() {
                this.$http.post('/operate/v1/recharge', this.forms).then(res => {
                    console.log('res', res);

                });
            },

            sendBtn() {

            }

        },
        mounted() {
            this.loadData();
        }
    }
</script>

<style scoped lang="scss">
    .el-input {
        width: 160px;
    }

    .search_input.address {
        margin-left: 0;
    }

    .search_input {
        float: left;
        margin-left: 20px;
    }

    .el-button {
        margin-left: 20px;
    }

    .table {
        margin-top: 20px;
        th div {
            text-align: center;
        }
    }
    .sendt{
        .sendup{
            line-height: 30px;
            font-size: 18px;
            margin: 10px 0;
        }
        button{
            margin-left: 0;
        }
        .sendax{
            a{
                margin: 0 10px;
                text-decoration:none;
            }
        }
        .sendpl{
            font-size: 14px;
        }
        .senrname{
            margin-left: 10px;
        }
    }
</style>