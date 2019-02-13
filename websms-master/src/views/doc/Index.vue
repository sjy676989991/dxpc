<template>
<div>
    <el-card shadow="never" :body-style="{ padding: '0px' }">

      <div slot="header">
            接口文档
      </div>

      <div class="body">

      
      </div>

    </el-card>

</div>
</template>

<script>
//import CarrierDialog from '@/components/CarrierDialog.vue';

    export default {
        components:{
            //CarrierDialog
        },
        data(){
            return{
                carTypeIdOptions:[],
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
                this.$http.get('/operate/v1/template/list',{iDisplayStart: this.meta.iDisplayStart, iDisplayLength: this.meta.iDisplayLength}).then(res => {
                    // console.log('res',res);
                    this.tableData = res.data.data.items;
                    this.meta.iDisplayStart += 1;
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
                    name: '',
                    phone: '',
                    car_type_id:'',
                    type: '',
                    car_no: '',
                    device: ''
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