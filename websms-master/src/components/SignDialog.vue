<template>
    <el-dialog :title="isCreate ? `添加签名`:`编辑签名`" :visible="isVisible" @close="resetForm">
        <el-form :model="form" status-icon :rules="rules" ref="form" label-position="top">


            <el-form-item label="签名" :label-width="formLabelWidth" prop="signs">
                <el-input type="textarea" v-model="form.signs" autocomplete="off" placeholder="签名，例：【瑞卡云通】"></el-input>
            </el-form-item>


        </el-form>
        <p>提示：签名需要用中文大括号包裹,内容可为 APP名称，公司简写，网站名称.....</p>

        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm" >取 消</el-button>
            <el-button type="primary" @click.native.prevent="dialogFormSubmit" logining>提交</el-button>
        </div>
    </el-dialog>
</template>


<script>

    export default {
        name: 'SignDialog',
        props: {
            isVisible: {type: Boolean, default: false},
            isCreate: {type: Boolean, default: false},
            id: {type:Number, default: '',required: false},
            form: { type: Object, required: false},
        },
        data(){
            return {
                logining: false,
                formLabelWidth: '100px',
                rules: {
                    signs: [
                        { required: true, message: '请输入签名内容', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
        },
        methods: {

            dialogFormSubmit: function(){
                var _this = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {

                        console.log('this.form.rules',this.form.signs);

                        this.logining = true;
                        let signs = this.form.signs.split("\n");


                        console.log('from',signs);
                        if( this.isCreate ){

                            // 添加数据
                            this.$http.post('operate/v1/sign/create', signs).then(res => {
                                if( res.data.code == '00' )
                                {
                                    this.$message({
                                        'message': '添加成功，等待管理员审核',
                                        'type': 'success',
                                    });
                                    this.$emit("onAddResourceDialogEvent",false);
                                }else{
                                    this.$message({'message':res.data.message,'type':'error'});
                                }
                            });

                        }else{
                            var formData = Object.assign(this.form, {id: this.id});

                            // 更新数据
                            this.$http.post('operate/v1/sign/update', {id: this.id,sign: this.form.signs}).then(res => {
                                if( res.data.code == '00' )
                                {
                                    this.$message({
                                        'message': '修改成功',
                                        'type': 'success',
                                    });
                                    this.$emit("onAddResourceDialogEvent",false);
                                }else{

                                    this.$message({'message':res.data.message,'type':'error'});

                                }
                            });
                        }

                    } else {
                        this.$message.error('请完善表单内容');
                        return false;
                    }
                });
            },

            resetForm: function(){
                this.$refs['form'].resetFields();
                this.$emit("onAddResourceDialogEvent",false);
            },



        }
    }
</script>

<style scoped lang="scss">
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
