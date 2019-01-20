


<template>
<div>
<el-form :model="forms" status-icon :rules="rules" ref="ruleForm" label-width="100px">
    <el-card style="margin-bottom:10px;">

  <el-form-item label="充值条数" prop="smsCount">
    <el-input type="number" v-model="forms.smsCount" autocomplete="off"></el-input>
  </el-form-item>


  <el-form-item label="短信内容" prop="smsCount">
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
        components:{
        
        },
        data(){
            return{
            forms: {
                smsCount: '',
                unitPrice: '',
                type: '0',
                money: '',
                payWay: '',
            },
            rules: {
                smsCount: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                    { min: 11, message: '至少需要输入一个手机号', trigger: 'blur' }
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
                    console.log('res',res);
                
                });
            },

            sendBtn(){

            }

        },
        mounted() {
            this.loadData();
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