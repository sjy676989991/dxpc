<template>
<div>
    <el-card shadow="never" :body-style="{ padding: '0px' }">

      <div slot="header">
        <el-tooltip content="添加短信模板" placement="right">
            <el-button type="danger" style="margin: 0" @click.native.prevent="add()"><i class="el-icon-circle-plus"></i> 添加短信模板</el-button>
        </el-tooltip>

        <el-form :model="searchForm" ref="searchForm">
        <el-row :gutter="10" style="margin-top:20px;">
          <el-col :span="2">
            <el-input placeholder="ID" v-model="searchForm.id" style="width:100%"></el-input>
          </el-col>
          <el-col :span="5">
            <el-input placeholder="类型" v-model="searchForm.sign" style="width:100%"></el-input>
          </el-col>
          <el-col :span="5">
            <el-input placeholder="状态" v-model="searchForm.sign" style="width:100%"></el-input>
          </el-col>
          <el-col :span="5">
            <el-input placeholder="内容" v-model="searchForm.sign" style="width:100%"></el-input>
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
            <el-table-column prop="id" label="模板ID"  width="80"></el-table-column>
            <el-table-column prop="realType" label="短信类型">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.realType == '0'" type="success">验证码</el-tag>
                <el-tag v-if="scope.row.realType == '1'" type="success">通知</el-tag>
                <el-tag v-if="scope.row.realType == '2'" type="success">营销</el-tag>

              </template>
            </el-table-column>
            <el-table-column prop="sign" label="签名"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column prop="type" label="类型" width="120">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.type == '1'" type="success">营销短信</el-tag>
                    <el-tag v-else type="danger">普通短信</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="120">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status == '1'" type="success">审核成功</el-tag>
                    <el-tag v-else-if="scope.row.status == '2'" type="danger">审核失败</el-tag>
                    <el-tag v-else type="default">待审核</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="添加时间" width="160"></el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-tooltip content="编辑" placement="top">
                        <i class="el-icon-edit"  @click="handleEdit(scope.$index, scope.row)"></i>
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
            :total="meta.totalCount"
            layout="total,sizes, prev, pager, next, jumper">
        </el-pagination>
  </div>
    </el-card>

<TemplateDialog :isCreate="isCreate" :id="id" :isVisible="dialogVisible" :form="form" @onAddResourceDialogEvent="onAddResourceDialogEvent" />


</div>
</template>

<script>
import TemplateDialog from '@/components/TemplateDialog';

    export default {
        name: "carrier",
        components:{
            TemplateDialog
        },
        data(){
            return{
                id: 0,
                isCreate: true,
                dialogVisible: false,
                form: {
                    content: ''
                },
                searchForm: {
                    id: '',
                    content: ''
                },
                tableData: [],
                criteria: '',
                meta: {
                    iDisplayStart: 0, // 开始记录
                    iDisplayLength: 100, // 范围10-100 每页数量
                }
            }
        },
        methods: {
            // 搜索条件
            getCriteria(){
                this.criteria = JSON.stringify(this.searchForm);
            },

            // 载入数据
            loadData(){
                this.getCriteria();
                this.$http.post('/operate/v1/template/list',{iDisplayStart: this.meta.iDisplayStart, iDisplayLength: this.meta.iDisplayLength}).then(res => {
                    console.log('res',res);
                    this.tableData = res.data.data.items;
                    //this.meta.iDisplayStart += 1;
                    this.loading = false;
                });
            },

            //每页显示数据量变更
            handleSizeChange: function(val) {
                this.loading = true;
                this.meta.iDisplayLength = val;
                this.loadData();
            },

            //页码变更
            handleCurrentChange: function(val) {
                this.loading = true;
                this.meta.iDisplayLength = val;
                this.loadData();
            },

            // 添加联系人
            add: function(){
                this.isCreate = true;
                this.id = 0;
                this.form = {
                    realType: '0',
                    signId: '',
                    content:''
                };
                this.dialogVisible = true;
            },
            // 关闭联系dialog
            onAddResourceDialogEvent(data){
                this.dialogVisible = data;
                this.loadData();
            },
            // 编辑内容
            handleEdit: function(index, row){
                this.id = row.id;
                this.isCreate = false;
                this.dialogVisible = true;

                console.log('row',row);

                this.form = {
                    realType: row.realType,
                    signId: row.signId,
                    content: row.content
                };
            },
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
