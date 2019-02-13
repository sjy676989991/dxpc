<template>
    <div>
        <el-card shadow="never" :body-style="{ padding: '0px' }">
            <div slot="header">
                发送记录
                <el-form :model="searchForm" ref="searchForm">
                    <el-row :gutter="20" style="margin-top:20px;">
                        <el-col :span="10">
                            <!--<el-input placeholder="开始时间" v-model="searchForm.id" style="width:100%"></el-input>-->
                            <!--</el-col>-->
                            <!--<el-col :span="5">-->
                            <!--<el-input placeholder="结束时间" v-model="searchForm.sign" style="width:100%"></el-input>-->

                            <div class="block">
                                <el-date-picker
                                        v-model="value6"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <el-select placeholder="状态" v-model="staic">
                                <el-option label="发送中" value="0"></el-option>
                                <el-option label="已完成" value="1"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="手机号" type="number" v-model="mibilep"></el-input>
                        </el-col>

                        <el-col :span="5">
                            <el-button type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

            <div class="body">
                <el-table stripe :data="tableData" align="center">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="序号" width="80">
                        <template slot-scope="scope">
                            {{scope.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号"></el-table-column>
                    <el-table-column prop="content" label="内容"></el-table-column>
                    <el-table-column prop="smsCount" label="短信条数" width="100"></el-table-column>
                    <el-table-column prop="receiveTime" label="接受时间"></el-table-column>
                    <el-table-column prop="sendTime" label="发送时间"></el-table-column>
                    <el-table-column prop="reportTime" label="报告时间"></el-table-column>
                    <el-table-column prop="signType" label="状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status == '1'" type="success">已完成</el-tag>
                            <el-tag  v-else-if="scope.row.status == '0'" type="info">发送中</el-tag>
                            <el-tag  v-else-if="scope.row.status == '-1'" type="danger">发送失败</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="message" label="原因"></el-table-column>

                    <!--<el-table-column fixed="right" label="操作" width="100">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-tooltip content="编辑" placement="top">-->
                    <!--<i class="el-icon-edit"  @click="handleEdit(scope.$index, scope.row)"></i>-->
                    <!--</el-tooltip>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
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

    </div>
</template>

<script>
    //import CarrierDialog from '@/components/CarrierDialog.vue';

    export default {
        name: "carrier",
        components: {
            //CarrierDialog
        },
        data() {
            return {
                carTypeIdOptions: [],
                isCreate: true,
                id: 0,
                dialogVisible: false,
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
                    iDisplayStart: 1, // 开始记录
                    iDisplayLength: 10, // 范围10-100 每页数量
                    allList: 0 //总数目
                },
                value6: '',
                btime: '',
                ftime: '',
                staic: '',
                mibilep:''
            }
        },
        methods: {
            // 搜索条件
            // getCriteria(){
            //     this.criteria = JSON.stringify(this.searchForm);
            // },

            // 载入数据
            loadData() {
                // this.getCriteria();
                // console.log(this.value6)
                if (this.value6) {
                    this.btime = this.value6[0]
                    this.ftime = this.value6[1]
                }
                this.$http.post('/operate/v1/send/list', {
                    iDisplayStart: this.meta.iDisplayStart,
                    iDisplayLength: this.meta.iDisplayLength,
                    startTime: this.btime,
                    endTime: this.ftime,
                    status: this.staic,
                    mobile: this.mibilep
                }).then(res => {
                    // console.log('res', res);
                    this.tableData = res.data.data.items;
                    // console.log('res', this.tableData);
                    this.meta.allList=res.data.data.recordsTotal
                    this.loading = false;
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
                    name: '',
                    phone: '',
                    car_type_id: '',
                    type: '',
                    car_no: '',
                    device: ''
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
                this.isCreate = false;
                this.dialogVisible = true;
                this.form = {
                    type: row.type,
                    name: row.name,
                    phone: row.phone,
                    car_type_id: row.car_type_id,
                    car_no: row.car_no,
                    device: row.device
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
    /deep/ input::-webkit-outer-spin-button,
    /deep/ input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    /deep/ input[type="number"]{
        -moz-appearance: textfield;
    }
</style>