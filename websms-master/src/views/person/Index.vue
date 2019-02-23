<template>
    <div>

        <el-row>
            <el-col :span="24">
                <el-card>
                    <div slot="header">
                        <span>编辑</span><br>
                        <p>用户必须审核后才能使用接口</p>
                    </div>

                    <div class="elinput">
                        <el-input placeholder="请输入内容" v-model="input1">
                            <template slot="prepend">显示名</template>
                        </el-input>
                        <el-input class="elinput" placeholder="请输入内容" v-model="input2">
                            <template slot="prepend">ip白名单</template>
                        </el-input>
                        <el-input class="elinput" placeholder="请输入内容" v-model="input3">
                            <template slot="prepend">状态报告推送地址</template>
                        </el-input>
                        <el-input class="elinput" placeholder="请输入内容" v-model="input4">
                            <template slot="prepend">上行报告推送地址</template>
                        </el-input>
                        <div class="upimg">
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                                <div slot="tip" class="el-upload__tip">资质图片 PNG,JPG格式 4M以内</div>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>
                    <div class="buttons">
                        <el-button type="primary">保存</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>

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

                input1: '',
                input2: '',
                input3: '',
                input4: '',
                dialogImageUrl: '',
                dialogVisible: false,
            }
        },
        methods: {

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },
        mounted() {

        }
    };
</script>
<style scoped lang="scss">
    .elinput{
        margin-top: 20px;
    }

    .avatar-uploader{

    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .upimg,.buttons{
        margin-top: 50px;
    }
</style>