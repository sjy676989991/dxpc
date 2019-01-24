<template>
    <div>
        <el-form :model="forms" status-icon :rules="rules" ref="ruleForm" label-width="100px">
            <el-card style="margin-bottom:10px;">
                <div class="sendt">
                    <div class="sendup">上传手机号文件</div>
                    <el-upload
                               class="upload-demo"
                               ref="upload"
                               :action="this.$http.defaults.baseURL+'/operate/v1/importFromFile'"
                               :data="{
                                        token:$store.state.token
                                     }"
                               :on-preview="handlePreview"
                               :on-remove="handleRemove"
                               :limit='1'
                               :file-list="updatas.fileList"
                               :on-success="onsuccess"
                               list-type="text"
                               :auto-upload="false">
                        <el-button size="small" type="primary">选择文件</el-button>

                        <!--:headers="{Authorization:'Bearer '+$store.state.token}"-->
                        <div slot="tip" class="el-upload__tip">
                            <p class="sendpl">请先点击链接，然后右键“目标另存为”下载</p>
                            <p class="sendax">
                                <a href="/phoneTemplate.xlsx" download="phoneTemplate.xlsx">.xlsx模板下载</a>
                                <a href="/phoneTemplate.txt" download="phoneTemplate.txt">.txt模板下载</a>
                            </p>
                        </div>
                    </el-upload>

                    <p class="help-block">1、请保证手机号码的正确性。每次最多上传20W个，并且会过滤非法的手机号码。</p>
                    <p class="help-block">2、手动输入号码请用英文逗号或换行分隔。</p>
                    <p class="help-block">3、号码文件只支持TXT、EXCEL文件格式。</p>
                    <p class="help-block">4、汉字、数字、英文和标点符号都表示1个长度。</p>
                </div>
                <div class="infob">
                    <el-button type="success" @click="submitUpload">导入</el-button>
                </div>
            </el-card>

            <el-card style="margin-bottom:10px;">

                <el-form-item label="充值条数" prop="mobiles">
                    <el-input type="textarea" v-model="forms.mobiles" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="短信模板" >
                    <el-select  placeholder="请选择短信模板" v-model="messone" value="">
                        <el-option v-for="item in listMo"  :value="item.content">
                        </el-option>
                    </el-select>
                    <el-button type="success" @click="checksucc">添加模板</el-button>
                </el-form-item>

                <el-form-item label="短信内容" prop="smsContent">
                    <el-input type="textarea" v-model="forms.smsContent" autocomplete="off"></el-input>
                </el-form-item>


                <!--<el-form-item label="定时发送" prop="type">-->
                    <!--<el-radio-group v-model="forms.type" size="medium">-->
                        <!--<el-radio border label="行业"></el-radio>-->
                        <!--<el-radio border label="营销"></el-radio>-->
                    <!--</el-radio-group>-->
                <!--</el-form-item>-->


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
                    mobiles: '',
                    // type: '0',
                    // money: '',
                    // payWay: '',
                    smsContent: ''
                },
                rules: {
                    mobiles: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                        {min: 11, message: '至少需要输入一个手机号', trigger: 'blur'}
                    ],
                    smsContent: [
                        {required: true, message: '请输入短信内容', trigger: 'blur'},
                    ]
                },
                updatas: {
                    fileList: [],
                },
                listMo:[],
                messone:''
            }
        },
        methods: {

            // 载入数据
            // loadData() {
            //     this.$http.post('/operate/v1/recharge', this.forms).then(res => {
            //         console.log('res', res);
            //
            //     });
            // },
            sendBtn() {
                console.log(this.forms)
                this.$http.post('/operate/v1/sendSms', this.forms).then(res => {
                                console.log('res', res);

                            });
            },
            submitUpload() {
                console.log(this.updatas)
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            onsuccess(response) {
                console.log(response)
                this.forms.mobiles=response.data.phones
            },
            getsuccm() {
                this.$http.get('/operate/v1/template/success').then(res => {
                    console.log('res', res);
                    this.listMo=res.data.data
                    console.log(this.listMo)
                });
            },
            checksucc() {
                console.log(this.forms.smsContent)
                console.log(this.messone)
                this.forms.smsContent=this.messone
            }
        },
        mounted() {
            // this.loadData();
            this.getsuccm()
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

    .sendt {
        padding: 0 20px;
        .sendup {
            line-height: 30px;
            font-size: 18px;
            margin: 10px 0 20px 0;
        }
        button {
            margin-left: 0;
        }
        .sendax {
            a {
                margin: 0 10px;
                text-decoration: none;
            }
        }
        .sendpl {
            font-size: 14px;
        }
        .senrname {
            margin-left: 10px;
        }
        .help-block {
            color: #409EFF;
            margin: 5px 0 10px 0;
        }
    }

    .infob {
        border-top: 1px solid #f5f5f5;
        button {
            margin-top: 15px;
        }
    }

    .el-upload-list {
        width: 50%
    }
</style>