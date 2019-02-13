<template>
    <el-dialog :title="isCreate ? `添加短信模板`:`编辑短信模板`" :visible="isVisible" @close="resetForm">
        <p style="color: #F56C6C;">提示：变量必须用##符号进行包含（示例:您的验证码是:#code#,请勿告知他人）</p>
        <el-form :model="form" status-icon :rules="rules" ref="form" label-position="top">


            <el-form-item label="短信类型" :label-width="formLabelWidth" prop="realType">
                <el-radio-group v-model="form.realType" size="medium" >
                    <el-radio border label="0">验证码</el-radio>
                    <el-radio border label="1">通知</el-radio>
                    <el-radio border label="2">营销</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="常用模板" :label-width="formLabelWidth" prop="userId">
                <el-select v-model="userId" placeholder="请选择常用模板">
                    <el-option
                            v-for="item in userdata"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                    </el-option>
                </el-select>
            </el-form-item>


            <el-form-item label="短信签名" :label-width="formLabelWidth" prop="signId">
                <el-select v-model="form.signId" placeholder="请选择模板签名">
                    <el-option
                            v-for="item in signData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="模板内容" :label-width="formLabelWidth" prop="content">
                <el-input type="textarea" v-model="form.content" autocomplete="off"  placeholder="请输入模板内容"></el-input>
            </el-form-item>


        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm">取 消</el-button>
            <el-button type="primary" @click.native.prevent="dialogFormSubmit" logining>提交</el-button>
        </div>
    </el-dialog>
</template>


<script>

    export default {
        name: 'TemplateDialog',
        props: {
            isVisible: {type: Boolean, default: false},
            isCreate: {type: Boolean, default: false},
            id: {type: Number, default: '', required: false},
            form: {type: Object, required: false},
        },
        data() {
            return {
                signData: [],
                userdata:[],
                logining: false,
                formLabelWidth: '100px',
                rules: {
                    realType: [
                        {required: true, message: '请选择短信类型', trigger: 'change'},
                    ],
                    content: [
                        {required: true, message: '请输入短信模板内容', trigger: 'blur'},
                        {min: 2, max: 400, message: '长度在 2 到 400 个字符', trigger: 'blur'}
                    ],
                },
                userId:'',
            }
        },
        created() {
            this.getSignOptions();
        },
        watch: {
            "form.realType"(newval,val){
                this.$http.get('/operate/v1/template/system/'+newval).then(res => {
                    if (res.data.code == '00') {
                        // console.log('res',res);
                        let data = res.data.data;
                        let userdata = [];
                        data.forEach(item => {
                            // console.log('data',item);
                            userdata.push({label: item.templateContent, value: item.id});
                        });
                        this.userdata = userdata;
                    }

                });
            },
            "userId"(newval,val) {
                // console.log(this.userdata)
                this.form.content=newval
            }
        },
        methods: {
            /**
             * 获取签名列表
             */
            getSignOptions() {
                this.$http.get('/operate/v1/sign/all').then(res => {
                    if (res.data.code == '00') {
                        // console.log('res',res.data.data);
                        let data = res.data.data;
                        let signData = [];
                        data.forEach(item => {
                            // console.log('data',item);
                            signData.push({label: item.sign, value: item.id});
                        });
                        this.signData = signData;
                    }

                });
            },


            dialogFormSubmit: function () {
                // var _this = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {

                        this.logining = true;

                        // console.log('this.form',this.form);

                        if (this.isCreate) {

                            // 添加数据
                            this.$http.post('/operate/v1/template/add', this.form).then(res => {
                                if (res.data.code == '00') {
                                    this.$message({
                                        'message': '添加成功，等待管理员审核',
                                        'type': 'success',
                                    });
                                    this.$emit("onAddResourceDialogEvent", false);
                                } else {
                                    this.$message({'message': res.data.message, 'type': 'error'});
                                }
                            });

                        } else {
                            var formData = Object.assign(this.form, {templateId: this.id});
                            // 更新数据
                            // console.log(formData)
                            this.$http.post('operate/v1/template/update', formData).then(res => {
                                // console.log(res)
                                if (res.data.code == '00') {
                                    this.$message({
                                        'message': '修改成功',
                                        'type': 'success',
                                    });
                                    this.$emit("onAddResourceDialogEvent", false);
                                } else {

                                    this.$message({'message': res.data.message, 'type': 'error'});

                                }
                            });
                        }

                    } else {
                        this.$message.error('请完善表单内容');
                        return false;
                    }
                });
            },

            resetForm: function () {
                this.$refs['form'].resetFields();
                this.$emit("onAddResourceDialogEvent", false);
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
