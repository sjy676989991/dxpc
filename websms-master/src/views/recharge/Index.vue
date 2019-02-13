<template>
    <div>
        <el-form v-if="istrue==1" :model="forms" status-icon :rules="rules" ref="ruleForm" label-width="100px">
            <el-card style="margin-bottom:10px;">


                <el-form-item label="充值条数" prop="smsCount">
                    <el-input type="number" v-model="forms.smsCount"></el-input>
                </el-form-item>


                <!--<el-form-item label="短信内容" prop="smsCount">-->
                <!--<el-input type="textarea" v-model="forms.smsContent" autocomplete="off"></el-input>-->
                <!--</el-form-item>-->


                <el-form-item label="充值类型" prop="type">
                    <el-radio-group v-model="forms.type" size="medium">
                        <el-radio border label="0">行业</el-radio>
                        <el-radio border label="1">营销</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item v-if="this.forms.unitPrice" label="单价" prop="type">
                    <el-input :disabled="true" v-model="this.forms.unitPrice+'元/条'"></el-input>
                </el-form-item>
                <el-form-item v-if="this.forms.money" label="总金额" prop="type">
                    <el-input :disabled="true" v-model="this.forms.money+'元'"></el-input>
                </el-form-item>

                <el-form-item label="付款方式" prop="payWay">
                    <el-radio-group v-model="forms.payWay" size="medium">
                        <el-radio border label="WX_NATIVE">微信扫码</el-radio>
                        <el-radio border label="ALI_QRCODE">支付宝扫</el-radio>
                        <!--<el-radio border label="QQ扫码"></el-radio>-->
                        <!--<el-radio border label="银联扫码"></el-radio>-->
                        <!--<el-radio border label="clientIp"></el-radio>-->
                    </el-radio-group>
                </el-form-item>


                <el-form-item>
                    <el-button v-if="buttontru==2"

                               type="primary" @click="sendBtn" >立即充值</el-button>
                    <el-button v-if="buttontru==1" type="info" disabled>立即充值</el-button>
                </el-form-item>


            </el-card>
        </el-form>

        <el-form v-if="istrue==2">
            <el-card style="margin-bottom:10px; text-align: center">
                    <div class="imgcode">
                        <qriously :value="initQCode" :size="200"/>
                    </div>
                <el-button type="info" @click="info">返回</el-button>
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
                fullscreenLoading:false,
                istrue:1,
                forms: {
                    smsCount: '',
                    unitPrice: '',
                    type: '',
                    money: '',
                    payWay: '',
                },
                rules: {
                    smsCount: [
                        // { required: true, message: '请输入电话号码', trigger: 'blur' },
                        // { min: 11, message: '至少需要输入一个手机号', trigger: 'blur' }
                        {required: true, message: '请输入正确数目', trigger: 'blur'}
                    ],
                    unitPrice: [
                        {required: true, message: '请输入短信内容', trigger: 'blur'}
                    ]
                },
                initQCode:'',
                typepay:false,
                orderId:'',
                buttontru:'1',
            }
        },
        watch: {
            "forms.smsCount"(val,oldVal) {
                this.forms.smsCount=val
                if(this.forms.smsCount&&this.forms.type){
                    this.$http.post('/operate/v1/getUserPackage',
                        {
                            type: this.forms.type,
                            smsCount: this.forms.smsCount
                        }
                    ).then(res => {
                        this.buttontru=2
                        this.forms.unitPrice=res.data.data.unitPrice
                        this.forms.money=(res.data.data.unitPrice*this.forms.smsCount).toFixed(2)
                    });
                }
            },
            "forms.type"(val,oldVal) {
                this.forms.type=val
                // console.log(this.forms.type)
                if(this.forms.smsCount&&this.forms.type){
                    this.$http.post('/operate/v1/getUserPackage',
                        {
                            type: this.forms.type,
                            smsCount: this.forms.smsCount
                        }
                    ).then(res => {
                        this.buttontru=2
                        this.forms.unitPrice=res.data.data.unitPrice
                        this.forms.money=(res.data.data.unitPrice*this.forms.smsCount).toFixed(2)
                    });
                }
            },
        },
        methods: {

            // 载入数据
            loadData() {

            },
            sendBtn() {
                if (this.forms.smsCount && this.forms.type) {

                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$http.post('/operate/v1/recharge', this.forms).then(res => {
                        // console.log('res',res);
                        let that =this
                        loading.close();
                        that.initQCode=res.data.data.codeUrl
                        that.istrue=2
                        that.orderId =res.data.data.outTradeNo
                        setInterval(() => {
                            that.overpay();

                        }, 3000)
                    });
                } else {
                    this.$message({
                        type: 'warning',
                        message: `请规范输入`
                    })
                }

            },
            overpay() {
                this.$http.post("/operate/v1/recharge/task/"+this.orderId+"",
                ).then(res => {
                    // console.log('res',res);
                    if(res.data.data.status==1){
                        this.$router.push({path: "../dashboard"});
                    }else if(res.data.data.status==-1){
                        this.$confirm('支付失败！请重新下单', '提示', {
                            confirmButtonText: '确定',
                            type: 'warning',
                            center: true
                        }).then(() => {
                            this.istrue=1
                        })
                    }
                });
            },
            info() {
                this.istrue=1
                this.fullscreenLoading = false;
            },


        },
        mounted() {
            if(this.istrue==2){


            }

        },

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
    .imgcode{
        margin: 60px auto;
    }
    /deep/ input::-webkit-outer-spin-button,
    /deep/ input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    /deep/ input[type="number"] {
        -moz-appearance: textfield;
    }
</style>

