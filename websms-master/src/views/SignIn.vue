<template>
    <el-row class="login">
      <el-col :model="user" :offset="6" :span="12">
        <el-card class="login-box" v-loading="$store.state.loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-form>
            <h1 class="login-box-title">欢迎使用短信平台</h1>
            <p class="login-box-msg"></p>
            <el-form-item prop="mobile">
              <el-input type="text" v-model="user.mobile" auto-complete="off" placeholder="请输入手机号..." suffix-icon="el-icon-mobile-phone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="password" v-model="user.password" auto-complete="off" placeholder="请输入密码..." suffix-icon="el-icon-view"></el-input>
            </el-form-item>
              <el-form-item prop="code">
                  <el-col :span="14">
                      <el-input type="text" v-model="user.code" auto-complete="off" style="width:100%"  suffix-icon="el-icon-picture" placeholder="短信验证码"></el-input>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                      <img :src="url" @click="randImage" />
                  </el-col>
              </el-form-item>

              <el-form-item>
                  <el-button type="primary" @click="login" :loading="$store.state.loading" class="pull-right" style="width:100%">登录</el-button>
              </el-form-item>

          </el-form>
            <el-button type="text" @click="register" :loading="$store.state.loading" style="width:100%">注册新账号</el-button>
        </el-card>
      </el-col>
    </el-row>
</template>
<style lang="scss">
    html,body{
        background: #f1f1f1;
    }
.login {
    margin: 0 auto;
    width: 990px;
    padding-top:80px;
    &-box {
        background: #ffffff;
        border: none;
        &-msg {
            color: #000000;
            text-align: center;
        }
        &-title {
            color: #000000;
            text-align: center;
        }
    }
}
</style>
<script>
export default {
    name: "Login",
  data() {
    return {
        url: '',
        user: {
          mobile: "18627713655",
          password: "12345678",
          code: "",
          randomStr: "",
        }
    };
  },
  methods: {

      /**
       * 图形验证码
       */
      randImage(){
          var num=Math.ceil(Math.random()*100)+'A';
          this.user.randomStr = num;
          this.url = this.$store.state.baseUrl+'commons/login/captcha/'+num;
      },

        register(){
            this.$router.push({path:'register'});
        },

      /**
       * 登录
       */
      login() {
          this.$http.post("platform/v1/api/login", this.user).then(res => {
             const data = res.data;
             if( data.code != '00' )
             {
                 this.randImage();
                 return this.$message.error(data.message);
             }

              this.$message({message: data.message,type:'success'});
              this.$store.commit("setToken", data.data.token);
              return this.$router.push({ path: "/dashboard" });
          });
        }
  },
    created(){
        this.randImage();
    }
};
</script>