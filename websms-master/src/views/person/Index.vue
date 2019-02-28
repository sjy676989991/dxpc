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
                        <el-input placeholder="请输入内容" v-model="displayName">
                            <template slot="prepend">显示名</template>
                        </el-input>
                        <el-input class="elinput" placeholder="请输入内容" v-model="ips">
                            <template slot="prepend">ip白名单</template>
                        </el-input>
                        <el-input class="elinput" placeholder="请输入内容" v-model="reportCallbackUrl">
                            <template slot="prepend">状态报告推送地址</template>
                        </el-input>
                        <el-input class="elinput" placeholder="请输入内容" v-model="moCallbackUrl">
                            <template slot="prepend">上行报告推送地址</template>
                        </el-input>
                        <div class="upimg">
                            <el-upload
                                    :action="this.$store.state.baseUrl+'/platform/v1/upload/image'"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-success="handupsucc"
                                    :file-list="fileList2"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                                <div slot="tip" class="el-upload__tip">资质图片 PNG,JPG格式 4M以内</div>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="accessoryFileUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>
                    <div class="buttons">
                        <el-button type="primary" @click="srtup">保存</el-button>
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

                displayName: '',
                ips: '',
                reportCallbackUrl: '',
                moCallbackUrl: '',
                accessoryFileUrl: '',
                dialogVisible: false,
                path:'',
                fileList2: [{name: 'us', url: ''}]

            }
        },
        methods: {

            handleRemove(file, fileList) {
            },
            handlePictureCardPreview(file) {
                this.accessoryFileUrl = file.url;
                this.dialogVisible = true;
            },
            handupsucc(response, file, fileList){
                this.accessoryFileUrl=response.path
            },
            getUser(){
                this.$http.get('/platform/v1/userInfo').then(res => {
                    console.log(res)
                    const data = res.data;
                    if( data.code != '00')
                    {
                        return this.$message.error(data.message);
                    }
                    this.displayName=data.data.displayName
                    this.ips=data.data.ips
                    this.reportCallbackUrl=data.data.reportCallbackUrl
                    this.moCallbackUrl=data.data.moCallbackUrl
                    this.fileList2[0].url=data.data.accessoryFileUrl
                    this.accessoryFileUrl=data.data.accessoryFileUrl
                })
            },
            srtup(){
                this.$http.post('/platform/v1/userAudit',{
                    displayName:this.displayName,
                    ips:this.ips,
                    reportUrl:this.reportCallbackUrl,
                    moCallbackUrl:this.moCallbackUrl,
                    accessoryFileUrl:this.accessoryFileUrl,
                }).then(res => {
                    console.log(res)
                    const data = res.data;
                    if(data.code != '00'){
                        return this.$message.error(data.message);
                    }
                    return this.$message(data.message);
                })
            },
            srtaaaup(){
                this.$http.post('/platform/v1/day').then(res => {
                    console.log(res)

                })
            }
        },
        mounted() {
            this.getUser()
            console.log(this.$store.state.baseUrl)
            this.srtaaaup()
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