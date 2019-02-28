<template>
<div>
    <el-card shadow="never" :body-style="{ padding: '0px' }">
      <div slot="header">
          短信接口文档
      </div>
      <div class="body" >
          <p>接口调用方法说明</p>
          <p>1、开发者调用接口时账户必须通过平台审核</p>
          <p>2、计费方式，行业短信和营销短信分开扣费</p>
          <p>3、接口会进行ip鉴权，请开发者在客户端进行填写,多个ip用英文半角逗号隔开，或者交由我司客服进行配置</p>
          <p>4、开发者调用平台接口时需要加密传输</p>
          <p>5、应用层数据通post方式传输，（不要转换成json），具体参数信息请查阅各功能说明文档。</p>
          <p>6、最终的发送结果需要通过查询接口或者回调来确定短信的最终状态</p>
      </div>

    </el-card>

    <el-card style="margin-top: 20px">
        <div slot="">
            <p> 一、单条短信发送</p>
            <p>url:http://ip:port/send</p>
            <p> 提交方式:post</p>
        </div>
        <div>
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="参数名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="数据类型"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="是否必填"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="say"
                            label="说明">
                    </el-table-column>
                </el-table>
        </div>
        <div>
            <p>返回数据</p>
            <el-card style="background-color: #999999">
                {<br>
                &nbsp;&nbsp;"code":"00"          "",<br>
                &nbsp;&nbsp;       "msg":"提交成功"           "",<br>
                &nbsp;&nbsp;      "data":{<br>
                &nbsp;&nbsp;&nbsp;               "id":            "305a77c6-3014-4f53-b010-169ae1754733"  //发送返回唯一id<br>
                &nbsp;&nbsp;           }<br>
                }<br>
            </el-card>
        </div>
    </el-card>

    <el-card style="margin-top: 20px">
        <div slot="">
            <p>二、批量短信发送</p>
            <p> url:http://ip:port/massSend</p>
            <p>提交方式:post</p>
        </div>
        <div>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="参数名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="数据类型"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="是否必填"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="say"
                        label="说明">
                </el-table-column>
            </el-table>
        </div>
        <div>
            <p>返回数据</p>
            <el-card style="background-color: #999999">
                {<br>
                &nbsp;&nbsp;"code":"00"          "",<br>
                &nbsp;&nbsp;       "msg":"提交成功"           "",<br>
                &nbsp;&nbsp;      "data":{<br>
                &nbsp;&nbsp;&nbsp;               "id":            "305a77c6-3014-4f53-b010-169ae1754733"  //批量模板发送返回的批次号<br>
                &nbsp;&nbsp;           }<br>
                }<br>
            </el-card>
        </div>
    </el-card>
<!--3-->
    <el-card style="margin-top: 20px">
        <div slot="">
            <p>三、模板发送</p>
            <p> url:http://ip:port/templateSend</p>
            <p> 提交方式:post</p>
        </div>
        <div>
            <el-table
                    :data="tableData2"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="参数名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="数据类型"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="是否必填"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="say"
                        label="说明">
                </el-table-column>
            </el-table>
        </div>
        <div>
            <p>返回数据</p>
            <el-card style="background-color: #999999">
                {<br>
                &nbsp;&nbsp;"code":"00"          "",<br>
                &nbsp;&nbsp;       "msg":"提交成功"           "",<br>
                &nbsp;&nbsp;      "data":{<br>
                &nbsp;&nbsp;&nbsp;               "id":            "305a77c6-3014-4f53-b010-169ae1754733"  <br>
                &nbsp;&nbsp;           }<br>
                }<br>
            </el-card>
        </div>
    </el-card>
    <!--4-->
    <el-card style="margin-top: 20px">
        <div slot="">
            <p>四、批量模板发送</p>
            <p>url:http://ip:port/massTemplateSend</p>
            <p>提交方式:post</p>
        </div>
        <div>
            <el-table
                    :data="tableData2"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="参数名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="数据类型"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="是否必填"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="say"
                        label="说明">
                </el-table-column>
            </el-table>
        </div>
        <div>
            <p>返回数据</p>
            <el-card style="background-color: #999999">
                {<br>
                &nbsp;&nbsp;"code":"00"          "",<br>
                &nbsp;&nbsp;       "msg":"提交成功"           "",<br>
                &nbsp;&nbsp;      "data":{<br>
                &nbsp;&nbsp;&nbsp;               "id":            "305a77c6-3014-4f53-b010-169ae1754733"  //批量模板发送返回的批次号<br>
                &nbsp;&nbsp;           }<br>
                }<br>
            </el-card>
        </div>
    </el-card>
    <!--5-->
    <el-card style="margin-top: 20px">
        <div slot="">
            <p>五、查询短信状态</p>
            <p>url:http://ip:port/status</p>
            <p>提交方式:post</p>
        </div>
        <div>
            <el-table
                    :data="tableData3"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="参数名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="数据类型"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="是否必填"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="say"
                        label="说明">
                </el-table-column>
            </el-table>
        </div>
        <div>
            <p>返回数据</p>
            <el-card style="background-color: #999999">
                {<br>
                &nbsp;&nbsp;"code":"00"          "",<br>
                &nbsp;&nbsp;       "msg":"提交成功"           "",<br>
                &nbsp;&nbsp;      "data":{<br>
                &nbsp;&nbsp;&nbsp;&nbsp;  "id":"51288be7-e0f6-4220-976c-8f41d5e0504a",<br>
                &nbsp;&nbsp;&nbsp;&nbsp;  "mobile": "13164681020",<br>
                &nbsp;&nbsp;&nbsp;&nbsp;  "sendTime": "2018-09-30 10:47:16",<br>
                &nbsp;&nbsp;&nbsp;&nbsp;  "status": 1,  // 1 代表 成功，-1 代表发送失败<br>
                &nbsp;&nbsp;&nbsp;&nbsp;  "message": "DELIVRD"<br>
                &nbsp;&nbsp;           }<br>
                }<br>
            </el-card>
        </div>
    </el-card>
    <!--6-->
    <el-card style="margin-top: 20px">
        <div slot="">
            <p>六、查询上行回复</p>
            <p>url:http://ip:port/mo</p>
            <p>提交方式:post</p>
        </div>
        <div>
            <el-table
                    :data="tableData3"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="参数名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="数据类型"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="是否必填"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="say"
                        label="说明">
                </el-table-column>
            </el-table>
        </div>
        <div>
            <p>返回数据</p>
            <el-card style="background-color: #999999">
                {<br>
                &nbsp;&nbsp;"code":"00"          "",<br>
                &nbsp;&nbsp;       "msg":"提交成功"           "",<br>
                &nbsp;&nbsp;      "data":{<br>
                &nbsp;&nbsp;&nbsp;&nbsp;  "mobile": "13164681020",<br>
                &nbsp;&nbsp;&nbsp;&nbsp;   "content": "9663", //上行回复内容<br>
                &nbsp;&nbsp;&nbsp;&nbsp;  "receiveTime": "2018-07-12 16:07:39",<br>
                &nbsp;&nbsp;&nbsp;&nbsp;  "spcode": "02" //回复码号<br>
                &nbsp;&nbsp;           }<br>
                }<br>
            </el-card>
        </div>
    </el-card>
    <!--7  -->
    <el-card>
        <div slot="">
            <p>七、短信状态推送</p>
            <p>短信状态推送需用户提供回调短信状态的推送地址，且不管用户是否收到报告,只往此地址推送一次</p>
        </div>
        <div>
            <p>推送数据为</p>
            <el-card>
                {<br>
                &nbsp;&nbsp;"id":          "",<br>
                &nbsp;&nbsp;"mobile":      "",<br>
                &nbsp;&nbsp;"sendTime":    "", //yyyy-MM-dd HH:mm:ss<br>
                &nbsp;&nbsp;"status":      00，   //00：发送成功，01：发送失败<br>
                &nbsp;&nbsp;"message":""<br>
                }
            </el-card>
        </div>
        <div>
            <p>返回数据</p>
            <el-card>
                <p>code说明</p>
                <div style="margin-left: 20px">
                    <p>00，表示成功</p>
                    <p>01，表示失败</p>
                </div>
            </el-card>
        </div>
    </el-card>
    <!--8  -->
    <el-card>
        <div slot="">
            <p>八、短信上行推送</p>
            <p>短信上行推送需用户提供回调短信上行的推送地址，且不管用户是否收到上行,只往此地址推送一次</p>
        </div>
        <div>
            <p>推送数据为</p>
            <el-card>
                {<br>
                &nbsp;&nbsp;"mobile":      "",<br>
                &nbsp;&nbsp;"receiveTime":    "", //yyyy-MM-dd HH:mm:ss<br>
                &nbsp;&nbsp;"content":      "",<br>
                &nbsp;&nbsp;"spcode":        ""<br>
                }
            </el-card>
        </div>
        <div>
            <p>返回数据</p>
            <el-card>
                <p>code说明</p>
                <div style="margin-left: 20px">
                    <p>00，表示成功</p>
                    <p>01，表示失败</p>
                </div>
            </el-card>
        </div>
    </el-card>
    <!--9-->
    <el-card style="margin-top: 20px">
        <div slot="">
            <p>九、查询账户余额</p>
            <p>请求数据</p>
        </div>
        <div>
            <el-table
                    :data="tableData3"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="参数名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="数据类型"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="是否必填"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="say"
                        label="说明">
                </el-table-column>
            </el-table>
        </div>
        <div>
            <p>返回数据</p>
            <el-card style="background-color: #999999">
                {<br>
                &nbsp;&nbsp;"code":"00"          "",<br>
                &nbsp;&nbsp;       "msg":"提交成功"           "",<br>
                &nbsp;&nbsp;      "data":{<br>
                &nbsp;&nbsp;&nbsp;&nbsp;   "balance": 0,<br>
                &nbsp;&nbsp;&nbsp;&nbsp; "sms_count": -32,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;   "mak_sms_count": 0<br>
                &nbsp;&nbsp;           }<br>
                }<br>
            </el-card>
        </div>
    </el-card>
    <!--10-->
    <el-card>
        <div>十、提交返回码说明</div>
        <el-card style="margin-top: 20px">
            <el-table
                    :data="tableData4"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="返回码"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="说明"
                        width="180">
                </el-table-column>
            </el-table>
        </el-card>
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
            return {
                tableData: [{
                    date: 'username',
                    name: 'String',
                    address: '是',
                    say:'用户名,登陆平台账户'
                },{
                    date: 'mobile',
                    name: 'String',
                    address: '是',
                    say:'接收短信的手机号码'
                },{
                    date: 'content',
                    name: 'String',
                    address: '是',
                    say:'短信内容'
                },{
                    date: 'type',
                    name: 'String',
                    address: '是',
                    say:'发送类型 0:行业 1:营销'
                },{
                    date: 'time',
                    name: 'String',
                    address: '是',
                    say:'时间戳（格式为 yyyyMMddHHmmss）'
                },{
                    date: 'random',
                    name: 'String',
                    address: '是',
                    say:'随机数(必须10位)'
                },{
                    date: 'sig',
                    name: 'String',
                    address: '是',
                    say:'认证密钥,认证方式为 MD5（key+time+random） 其中key为用户的密钥，可在主页查看'
                },
                ],

                tableData2: [{
                    date: 'username',
                    name: 'String',
                    address: '是',
                    say:'用户名,登陆平台账户'
                },{
                    date: 'mobile',
                    name: 'String',
                    address: '是',
                    say:'接收短信的手机号码'
                },{
                    date: 'templateId',
                    name: 'String',
                    address: '是',
                    say:'模板id'
                },{
                    date: 'templateData',
                    name: 'json',
                    address: '是',
                    say:'//模板数据,短信参数列表，用于依次填充模板，JSON格式，每个变量长度不能超过30字，如模板内容为：您的验证码是#code#,请妥善保管。那需要传递json格式为{"code":"5504"};对于不包含变量的模板，则传递 {} 即可'
                },{
                    date: 'signId',
                    name: 'String',
                    address: '是',
                    say:'签名id可在后台查看'
                },{
                    date: 'time',
                    name: 'String',
                    address: '是',
                    say:'时间戳（格式为 yyyyMMddHHmmss）'
                },{
                    date: 'random',
                    name: 'String',
                    address: '是',
                    say:'随机数(必须10位)'
                },{
                    date: 'sig',
                    name: 'String',
                    address: '是',
                    say:'认证密钥,认证方式为 MD5（key+time+random） 其中key为用户的密钥，可在主页查看'
                },
                ],
                tableData3: [{
                    date: 'username',
                    name: 'String',
                    address: '是',
                    say:'用户名,登陆平台账户'
                },{
                    date: 'time',
                    name: 'String',
                    address: '是',
                    say:'时间戳（格式为 yyyyMMddHHmmss）'
                },{
                    date: 'random',
                    name: 'String',
                    address: '是',
                    say:'随机数(必须10位)'
                },{
                    date: 'sig',
                    name: 'String',
                    address: '是',
                    say:'认证密钥,认证方式为 MD5（key+time+random） 其中key为用户的密钥，可在主页查看'
                },
                ],
                tableData4:[
                    {date:'00', name:'提交成功'},
                    {date:'01', name:'认证失败'},
                    {date:'02', name:'输入错误'},
                    {date:'03', name:'禁止访问'},
                    {date:'04', name:'内容不能为空'},
                    {date:'05', name:'短信内容非法'},
                    {date:'06', name:'手机号码格式非法'},
                    {date:'07', name:'扩展号码格式不正确'},
                    {date:'08', name:'签名不正确'},
                    {date:'11', name:'服务器有点忙'},
                    {date:'12', name:'DuplicatedError'},
                    {date:'15', name:'所请求的资源并不存在'},
                    {date:'15', name:'输入参数不合法'},
                    {date:'16', name:'短信发送类型错误'},
                    {date:'17', name:'余额不足'},
                    {date:'18', name:'开发者未审核'},
                ]
            }
        },
        methods: {

        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .body{
        padding: 20px 30px;
        p{
            margin: 0;
            line-height: 30px;
        }
    }
</style>