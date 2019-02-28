<template>
        <el-row class="register">
            <el-col :model="user" :offset="6" :span="12">
                <h1 class="register-title">注册新账号</h1>
                <p class="register-box-msg"></p>
                <el-card class="register-box" v-loading="$store.state.loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <el-form :model="user" ref="user" :rules="rulesUser" label-width="100px">

                        <el-form-item prop="mobile" label="手机号码">
                            <el-input type="text" v-model="user.mobile"  auto-complete="off" placeholder="请输入手机号..." suffix-icon="el-icon-mobile-phone"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="登录密码">
                            <el-input type="password" v-model="user.password" auto-complete="off" placeholder="请输入密码..." suffix-icon="el-icon-view"></el-input>
                        </el-form-item>
                        <el-form-item prop="displayName" label="企业名称">
                            <el-input type="text" v-model="user.displayName" auto-complete="off" placeholder="请输入企业名称,用于审核" suffix-icon="el-icon-message"></el-input>
                        </el-form-item>

                        <el-form-item prop="captcha" label="图形验证">
                            <el-col :span="14">
                                <el-input type="text" v-model="user.captcha" auto-complete="off" style="width:100%"  suffix-icon="el-icon-picture"  placeholder="短信验证码"></el-input>
                            </el-col>
                            <el-col :span="1">&nbsp;</el-col>
                            <el-col :span="9">
                                <img :src="url" @click="randImage" />
                            </el-col>
                        </el-form-item>

                        <el-form-item prop="mobileCode" label="短信验证">
                            <el-col :span="14">
                                <el-input type="text" v-model="user.mobileCode" auto-complete="off" style="width:100%"  suffix-icon="el-icon-mobile-phone"  placeholder="短信验证码"></el-input>
                            </el-col>
                            <el-col :span="1">&nbsp;</el-col>
                            <el-col :span="9">
                                <el-button v-show="sendAuthCode" type="default" style="width:100%;" @click="sendSms" :disabled="isSendBtnVisbile" plain>发送验证码</el-button>
                                <el-button v-show="!sendAuthCode" type="default" plain>{{auth_time}} 秒</el-button>
                            </el-col>
                        </el-form-item>


                        <el-form-item>
                            <el-checkbox v-model="checked" @change="dialogVisible = true">我已阅读短信《短信平台服务条款》</el-checkbox>
                        </el-form-item>

                    </el-form>
                </el-card>
                <el-button style="width: 100%;margin:20px 0;" type="primary" @click="register" :loading="$store.state.loading" class="pull-right">立即注册</el-button>
                <el-row>
                    <el-col ><el-button type="text" @click="login" class="pull-right" style="width:100%">我有账号，点这里登录</el-button></el-col>
                </el-row>

                <el-dialog title="注册协议" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
                    <span>注册协议内容</span>
                    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
                </el-dialog>

            </el-col>
        </el-row>
</template>
<style lang="scss">
    html,body{
        background: #f1f1f1;
    }
    .register {
        margin: 0 auto;
        width: 990px;
        padding-top:50px;
        &-title{
            color: #000000;
            text-align: center;
        }
        &-box{
            background: #ffffff;
            border: none;
        }
        &-box-msg{
            color: #000000;
            text-align: center;
        }
    }
</style>
<script>
    import store from '@/store';

    export default {
        data() {
            return {
                dialogVisible: false,
                checked: false,
                url: '',
                randomCode: '',
                isSendBtnVisbile: false, // 短信发送按钮
                sendAuthCode: true,
                auth_time: 0,
                user: {
                    mobile: "",
                    password: "",
                    displayName: '',
                    captcha: '',
                    mobileCode: '',
                },
                rulesUser: {
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { type: 'number', message: '请输入数字格式', trigger: 'blur', transform(value) {return Number(value);}}
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur', }
                    ],
                    displayName: [
                        { required: true, message: '请输入企业名称', trigger: 'blur', }
                    ],
                    captcha: [
                        { required: true, message: '请输入图形验证码', trigger: 'blur', },
                    ],
                    mobileCode: [
                        { required: true, message: '请输入短信验证码', trigger: 'blur', },
                        { type: 'number', message: '请输入数字格式', trigger: 'blur', transform(value) {return Number(value);}}
                    ]
                }
            };
        },
        methods: {

            randImage(){
                var num=Math.ceil(Math.random()*10);
                this.randomCode = num;
                this.url = store.state.baseUrl+'commons/register/captcha/'+num;
            },

            /**
             * 发送短信验证码
             *
             * @returns {ElMessageComponent}
             */
            sendSms(){
                let mobile = this.user.mobile;
                if(!mobile){
                    return this.$message.error('请输入手机号');
                }
                let captcha = this.user.captcha;
                if( !captcha ){
                    return this.$message.error('输入图形验证码');
                }

                this.$http.post('commons/send/sms',{captcha: captcha, mobile: mobile,randomCode: this.randomCode}).then(res => {
                    let data = res.data;
                    console.log('sms',data);
                    if( data.code != '00' )
                    {
                        this.randImage();
                        return this.$message.error(data.message);
                    }
                    this.sendAuthCode = true;

                })
            },

            /**
             * 提交注册
             */
            register(){
                var _this = this;
                this.$refs['user'].validate((valid) => {
                    if (valid) {
                        if( !_this.checked ){
                            return _this.$message.error('请同意注册协议');
                        }

                        this.$http.post('commons/register', this.user).then(res => {
                            // console.log('res', res.data);
                            let data = res.data;
                            if( data.code != '00' )
                            {
                               return _this.$message.error(data.message);
                            }
                            this.$router.push({ name: "signIn" });

                        });
                    }
                });
            },

            login() {
                this.$router.push({name:'signIn'})
            },

            handleClose(){
                this.dialogVisible = false;
            }
        },
        created(){
            this.randImage();
        }
    };
</script>