<template>
<div>
<el-form :model="forms" status-icon :rules="rules" ref="ruleForm" label-width="100px">
    <el-card style="margin-bottom:10px;">



  <el-form-item label="充值条数" prop="smsCount">
    <el-input  type="number" v-model="forms.smsCount"  ></el-input>
  </el-form-item>


  <!--<el-form-item label="短信内容" prop="smsCount">-->
    <!--<el-input type="textarea" v-model="forms.smsContent" autocomplete="off"></el-input>-->
  <!--</el-form-item>-->


      <el-form-item label="充值类型" prop="type">
        <el-radio-group v-model="forms.type" size="medium">
          <el-radio border label="行业"></el-radio>
          <el-radio border label="营销"></el-radio>
        </el-radio-group>
      </el-form-item>


   <el-form-item label="付款方式" prop="payWay">
    <el-radio-group v-model="forms.payWay" size="medium">
      <el-radio border label="微信扫码"></el-radio>
      <el-radio border label="支付宝扫"></el-radio>
      <!--<el-radio border label="QQ扫码"></el-radio>-->
      <!--<el-radio border label="银联扫码"></el-radio>-->
      <!--<el-radio border label="clientIp"></el-radio>-->
    </el-radio-group>
  </el-form-item>



  <el-form-item>
    <el-button type="primary" @click="sendBtn" logining>立即充值</el-button>
  </el-form-item>





</el-card>
</el-form>

</div>
</template>

<script>
export default {
        name: "recharge",
        components:{
        
        },
        data(){
            return{
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
                    { required: true, message: '请输入正确数目', trigger: 'blur' }
                ],
                unitPrice: [
                    { required: true, message: '请输入短信内容', trigger: 'blur' }
                ]
            }
            }
        },
        methods: {
  
            // 载入数据
            loadData(){
                this.$http.post('/operate/v1/recharge',this.forms).then(res => {
                    // console.log('res',res);
                
                });
            },

            sendBtn(){
              if(this.forms.smsCount&&this.forms.type){
                  this.$http.post('/operate/v1/recharge',this.forms).then(res => {
                      // console.log('res',res);

                  });
              }else {
                  this.$message({
                      type: 'warning',
                      message: `请规范输入`
                  })
              }
            }

        },
        mounted() {
            // this.loadData();
        }
    }
</script>

<style scoped lang="scss">
    .el-input{
        width: 160px;
    }
    .search_input.address{
        margin-left: 0;
    }
    .search_input{
        float: left;
        margin-left: 20px;
    }
    .el-button{
        margin-left: 20px;
    }
    .table{
        margin-top: 20px;
        th div{
            text-align: center;
        }
    }
</style>

