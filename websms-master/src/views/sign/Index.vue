<template>
    <div>
        <el-card shadow="never" :body-style="{ padding: '0px' }">

            <div slot="header">
                <el-tooltip content="添加短信签名" placement="right">
                    <el-button type="danger" style="margin: 0" @click.native.prevent="add()"><i
                            class="el-icon-circle-plus"></i> 添加短信签名
                    </el-button>
                </el-tooltip>
                    <el-row  style="margin-top:20px;">

                        <el-col :span="5">
                            <el-input v-model="idnum" placeholder="签名" type="number" ></el-input>
                        </el-col>

                        <el-col :span="5">
                            <el-button type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
                        </el-col>
                    </el-row>
            </div>
            <div class="body">
                <el-table stripe :data="tableData" align="center">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="序号" width="80">
                        <template slot-scope="scope">
                            {{scope.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="签名ID" width="80"></el-table-column>
                    <el-table-column prop="sign" label="签名"></el-table-column>
                    <el-table-column prop="signType" label="状态" width="180">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.signType == '-1'" type="info">审核失败</el-tag>
                            <el-tag v-if="scope.row.signType == '1'" type="success">审核成功</el-tag>
                            <el-tag v-else type="danger">等待审核</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="添加时间" width="180"></el-table-column>

                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-tooltip content="编辑" placement="top">
                                <i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="footer" style="padding:10px 0;text-align:center;">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        :current-page="meta.currentPage"
                        :page-size="meta.perPage"
                        :total="meta.allList"
                        layout="total,sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </el-card>
        <SignDialog :isCreate="isCreate" :id="id" :isVisible="dialogVisible" :form="form"
                    @onAddResourceDialogEvent="onAddResourceDialogEvent"/>
    </div>
</template>

<script>
    import SignDialog from '@/components/SignDialog.vue';

    export default {
        name: "sign",
        components: {
            SignDialog
        },
        data() {
            return {
                id: 0,
                isCreate: true,
                dialogVisible: false,
                idnum:'',
                form: {
                    signs: ''
                },
                searchForm: {
                    id: '',
                    signs: ''
                },
                tableData: [],
                criteria: '',
                meta: {
                    iDisplayStart: 0, // 开始记录
                    iDisplayLength: 10, // 范围10-100 每页数量
                    allList: 0,//总数
                }
            }
        },
        methods: {
            // 搜索条件
            getCriteria() {
                this.criteria = JSON.stringify(this.searchForm);
            },

            // 载入数据
            loadData() {
                console.log(this.idnum)
                this.getCriteria();
                this.$http.post('/operate/v1/sign/list', {
                    iDisplayStart: this.meta.iDisplayStart,
                    iDisplayLength: this.meta.iDisplayLength,
                    signId :this.idnum
                }).then(res => {
                    console.log(res)
                    this.tableData = res.data.data.items;
                    //this.meta.iDisplayStart += 1;
                    this.loading = false;
                    this.meta.allList = res.data.data.recordsTotal
                    // console.log(typeof(this.meta.allList))
                });
            },

            //每页显示数据量变更
            handleSizeChange: function (val) {
                this.loading = true;
                this.meta.iDisplayLength = val;
                this.loadData();
            },

            //页码变更
            handleCurrentChange: function (val) {
                this.loading = true;
                this.meta.iDisplayStart = (val - 1) * this.meta.iDisplayLength;
                this.loadData();
            },

            // 添加联系人
            add: function () {
                this.isCreate = true;
                this.id = 0;
                this.form = {
                    signs: ''
                };
                this.dialogVisible = true;
            },
            // 关闭联系dialog
            onAddResourceDialogEvent(data) {
                this.dialogVisible = data;
                this.loadData();
            },
            // 编辑内容
            handleEdit: function (index, row) {
                this.id = row.id;

                // console.log('row',row);

                this.isCreate = false;
                this.dialogVisible = true;
                this.form = {
                    signs: row.sign
                };
            },
        },
        mounted() {
            this.loadData();
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

    .pagea {
        font-weight: normal;
        color: #606266;
        font-size: 13px;
        height: 28px;
        line-height: 28px;
        margin-top: 8px;
    }
    .loginget{
        /*float: right;*/
    }

    /deep/ input::-webkit-outer-spin-button,
    /deep/ input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    /deep/ input[type="number"]{
        -moz-appearance: textfield;
    }
</style>
