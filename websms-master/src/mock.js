const Mock = require("mockjs");

const signIn = () => ({
  token:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTUzMDMyODY2MywiaWF0IjoxNTI5NzIzODYzfQ.cgmhRgLhy8P0U2l1oLhZqHwlsetp4tUGWjxaDRjHq2uKYOKSveZikhsl_r1drbNQ8lg8ErviShknFVgo-nXg1g"
});

const queryUserAuthority = () => ({
  menus: [
    {
      menuId: 1,
      menuName: "根节点",
      menuCode: "root",
      link: "/root",
      icon: "el-icon-menu",
      lft: 1,
      rgt: 31,
      depth: 0
    },
    {
      menuId: 2,
      menuName: "首页",
      menuCode: "dashboard",
      link: "/dashboard",
      icon: "el-icon-ali-warehouse-delivery",
      lft: 2,
      rgt: 3,
      depth: 1
    },
    {
      menuId: 3,
      menuName: "签名管理",
      menuCode: "sign",
      link: "/sign",
      icon: "el-icon-ali-electrical",
      lft: 4,
      rgt: 5,
      depth: 1
    },
    {
      menuId: 4,
      menuName: "模板管理",
      menuCode: "template",
      link: "/template",
      icon: "el-icon-ali-templatedefault",
      lft: 4,
      rgt: 5,
      depth: 1
    },    
    {
      menuId: 5,
      menuName: "发送短信",
      menuCode: "sms",
      link: "/sms",
      icon: "el-icon-ali-emailfilling",
      lft: 6,
      rgt: 7,
      depth: 1
    },   
    {
      menuId: 6,
      menuName: "批次任务",
      menuCode: "batch",
      link: "/batch",
      icon: "el-icon-ali-copy",
      lft: 8,
      rgt: 9,
      depth: 1
    },        
    {
      menuId: 7,
      menuName: "发送记录",
      menuCode: "mt",
      link: "/mt",
      icon: "el-icon-ali-inquirytemplate",
      lft: 10,
      rgt: 11,
      depth: 1
    },        
    {
      menuId: 8,
      menuName: "上行记录",
      menuCode: "mo",
      link: "/mo",
      icon: "el-icon-ali-rfq",
      lft: 12,
      rgt: 13,
      depth: 1
    },
    {
      menuId: 9,
      menuName: "充值记录",
      menuCode: "recharge",
      link: "/recharge",
      icon: "el-icon-ali-cart",
      lft: 14,
      rgt: 15,
      depth: 1
    }, 
    {
      menuId: 10,
      menuName: "接口文档",
      menuCode: "doc",
      link: "/doc",
      icon: "el-icon-ali-pdf",
      lft: 16,
      rgt: 17,
      depth: 1
    },          
    {
      menuId: 11,
      menuName: "系统管理",
      menuCode: "system",
      link: "/system",
      icon: "el-icon-ali-set",
      lft: 18,
      rgt: 30,
      depth: 1
    },
    {
      menuId: 4,
      menuName: "个人设定",
      menuCode: "profile",
      link: "/system/profile",
      icon: "el-icon-ali-survey1",
      lft: 19,
      rgt: 20,
      depth: 2
    },
    {
      menuId: 5,
      menuName: "白名单",
      menuCode: "user",
      link: "/system/user",
      icon: "el-icon-ali-bussinesscard",
      lft: 21,
      rgt: 22,
      depth: 2
    },
    
  ],
  authorities: [
    { authority_id: 1, authority_code: "AddUser", authority_name: "新增用户" },
    { authority_id: 2, authority_code: "EditUser", authority_name: "修改用户" },
    {
      authority_id: 3,
      authority_code: "DeleteUser",
      authority_name: "删除用户"
    },
    {
      authority_id: 4,
      authority_code: "QueryUser",
      authority_name: "查询用户"
    },
    {
      authority_id: 5,
      authority_code: "QueryReport",
      authority_name: "查询报告"
    }
  ]
});

const queryUser = () => ({
  total: 3,
  size: 2,
  current: 1,
  records: [
    {
      userId: 1,
      userName: "guest",
      password: "$2a$10$llOd5/mvInD.OTVkPr/hqeFaa6wX4DCbtKIJwRq5vhKLd3mJNtLqi",
      nation: 86,
      phone: 15985859933,
      avatar: null,
      email: "test@test.com",
      gender: null,
      birthday: "2018-07-16T00:50:31.000+0000",
      enabled: false,
      type: 1,
      createDate: "2018-07-16T00:50:31.000+0000",
      lastDate: "2018-07-16T00:50:31.000+0000",
      signInDate: "2018-07-16T00:50:31.000+0000"
    },
    {
      userId: 2,
      userName: "user",
      password: "$2a$10$llOd5/mvInD.OTVkPr/hqeFaa6wX4DCbtKIJwRq5vhKLd3mJNtLqi",
      nation: 86,
      phone: 15985859933,
      avatar: null,
      email: "test@test.com",
      gender: null,
      birthday: "2018-07-16T00:50:31.000+0000",
      enabled: true,
      type: 1,
      createDate: "2018-07-16T00:50:31.000+0000",
      lastDate: "2018-07-16T00:50:31.000+0000",
      signInDate: "2018-07-16T00:50:31.000+0000"
    },
    {
      userId: 3,
      userName: "user",
      password: "$2a$10$llOd5/mvInD.OTVkPr/hqeFaa6wX4DCbtKIJwRq5vhKLd3mJNtLqi",
      nation: 86,
      phone: 15985859933,
      avatar: null,
      email: "test@test.com",
      gender: null,
      birthday: "2018-07-16T00:50:31.000+0000",
      enabled: true,
      type: 1,
      createDate: "2018-07-16T00:50:31.000+0000",
      lastDate: "2018-07-16T00:50:31.000+0000",
      signInDate: "2018-07-16T00:50:31.000+0000"
    },
    {
      userId: 4,
      userName: "user",
      password: "$2a$10$llOd5/mvInD.OTVkPr/hqeFaa6wX4DCbtKIJwRq5vhKLd3mJNtLqi",
      nation: 86,
      phone: 15985859933,
      avatar: null,
      email: "test@test.com",
      gender: null,
      birthday: "2018-07-16T00:50:31.000+0000",
      enabled: true,
      type: 1,
      createDate: "2018-07-16T00:50:31.000+0000",
      lastDate: "2018-07-16T00:50:31.000+0000",
      signInDate: "2018-07-16T00:50:31.000+0000"
    },
    {
      userId: 5,
      userName: "user",
      password: "$2a$10$llOd5/mvInD.OTVkPr/hqeFaa6wX4DCbtKIJwRq5vhKLd3mJNtLqi",
      nation: 86,
      phone: 15985859933,
      avatar: null,
      email: "test@test.com",
      gender: null,
      birthday: "2018-07-16T00:50:31.000+0000",
      enabled: true,
      type: 1,
      createDate: "2018-07-16T00:50:31.000+0000",
      lastDate: "2018-07-16T00:50:31.000+0000",
      signInDate: "2018-07-16T00:50:31.000+0000"
    },
    {
      userId: 6,
      userName: "user",
      password: "$2a$10$llOd5/mvInD.OTVkPr/hqeFaa6wX4DCbtKIJwRq5vhKLd3mJNtLqi",
      nation: 86,
      phone: 15985859933,
      avatar: null,
      email: "test@test.com",
      gender: null,
      birthday: "2018-07-16T00:50:31.000+0000",
      enabled: true,
      type: 1,
      createDate: "2018-07-16T00:50:31.000+0000",
      lastDate: "2018-07-16T00:50:31.000+0000",
      signInDate: "2018-07-16T00:50:31.000+0000"
    },
    {
      userId: 7,
      userName: "user",
      password: "$2a$10$llOd5/mvInD.OTVkPr/hqeFaa6wX4DCbtKIJwRq5vhKLd3mJNtLqi",
      nation: 86,
      phone: 15985859933,
      avatar: null,
      email: "test@test.com",
      gender: null,
      birthday: "2018-07-16T00:50:31.000+0000",
      enabled: true,
      type: 1,
      createDate: "2018-07-16T00:50:31.000+0000",
      lastDate: "2018-07-16T00:50:31.000+0000",
      signInDate: "2018-07-16T00:50:31.000+0000"
    },
    {
      userId: 8,
      userName: "user",
      password: "$2a$10$llOd5/mvInD.OTVkPr/hqeFaa6wX4DCbtKIJwRq5vhKLd3mJNtLqi",
      nation: 86,
      phone: 15985859933,
      avatar: null,
      email: "test@test.com",
      gender: null,
      birthday: "2018-07-16T00:50:31.000+0000",
      enabled: true,
      type: 1,
      createDate: "2018-07-16T00:50:31.000+0000",
      lastDate: "2018-07-16T00:50:31.000+0000",
      signInDate: "2018-07-16T00:50:31.000+0000"
    },
    {
      userId: 9,
      userName: "user",
      password: "$2a$10$llOd5/mvInD.OTVkPr/hqeFaa6wX4DCbtKIJwRq5vhKLd3mJNtLqi",
      nation: 86,
      phone: 15985859933,
      avatar: null,
      email: "test@test.com",
      gender: null,
      birthday: "2018-07-16T00:50:31.000+0000",
      enabled: true,
      type: 1,
      createDate: "2018-07-16T00:50:31.000+0000",
      lastDate: "2018-07-16T00:50:31.000+0000",
      signInDate: "2018-07-16T00:50:31.000+0000"
    },
    {
      userId: 10,
      userName: "user",
      password: "$2a$10$llOd5/mvInD.OTVkPr/hqeFaa6wX4DCbtKIJwRq5vhKLd3mJNtLqi",
      nation: 86,
      phone: 15985859933,
      avatar: null,
      email: "test@test.com",
      gender: null,
      birthday: "2018-07-16T00:50:31.000+0000",
      enabled: true,
      type: 1,
      createDate: "2018-07-16T00:50:31.000+0000",
      lastDate: "2018-07-16T00:50:31.000+0000",
      signInDate: "2018-07-16T00:50:31.000+0000"
    }
  ],
  pages: 2
});


// 签名列表
const signList = () => ({
    "code": "00",
    "message": "成功",
    "data": {
        "recordsTotal": 1, //总记录数
        "items": [
            {
                "id": 2002,
                "sign": "【天天快递】",
                "createTime": "2018-10-25 15:00:35",
                "signType": 1 // 0 待审核  1审核成功  -1 审核失败
            },
            {
              "id": 2003,
              "sign": "【我的快递】",
              "createTime": "2018-10-25 15:00:35",
              "signType": 0 // 0 待审核  1审核成功  -1 审核失败
          }
        ]
    }
});

// 模板
const templateList = () => ({
    "code": "00",
    "msg":  "",
    "data": 
      {
         "recordsTotal":        "", //记录总数
            "items":[
                {
                  "id":"1",//模板id
                  "content":"您的验证码是#code#。如非本人操作，请忽略本短信",//模板类容
                  "status":"0",//审核状态  0 待审核,1 审核成功,2审核失败
                  "type":"0", //短信类型 0 普通短信  1营销短信
                  "realType":"0", // 0 验证码 1 通知  2营销短信
                  "createTime":"2018-10-25 15:00:35",//创建时间
                  "signId":"203",//签名id
                  "sign":"【天天快递】",//签名内容
                },
                {
                  "id":"2",//模板id
                  "content":"您的验证码是#code#。如非本人操作，请忽略本短信",//模板类容
                  "status":"1",//审核状态  0 待审核,1 审核成功,2审核失败
                  "type":"1", //短信类型 0 普通短信  1营销短信
                  "realType":"1", // 0 验证码 1 通知  2营销短信
                  "createTime":"2018-10-25 15:00:35",//创建时间
                  "signId":"203",//签名id
                  "sign":"【天天快递】",//签名内容
                },
                {
                  "id":"3",//模板id
                  "content":"您的验证码是#code#。如非本人操作，请忽略本短信",//模板类容
                  "status":"2",//审核状态  0 待审核,1 审核成功,2审核失败
                  "type":"1", //短信类型 0 普通短信  1营销短信
                  "realType":"1", // 0 验证码 1 通知  2营销短信
                  "createTime":"2018-10-25 15:00:35",//创建时间
                  "signId":"203",//签名id
                  "sign":"【天天快递】",//签名内容
                },                
          ]
        }  
});


const batchList = () => ({
    "code": "00",
    "msg":  "",
    "data":       {
         "recordsTotal":        "", //记录总数
          "items": [
          {
                "batchNo":"aaa",//批次号
                "mobileSize":"33",//提交号码数量
                "type":"0",//状态  0 发送中 1 已完成
                "content":"asdfasdf", //发送内容
                "createTime":"2018-10-25 15:00:35",//创建时间
                "complteTime":"2018-10-25 15:00:35",//完成时间
          }
        ]
      }
      
});



Mock.mock("/passport/signIn", "post", signIn);
Mock.mock("/user/queryUserAuthority", "get", queryUserAuthority);
Mock.mock("/user", "get", queryUser);
Mock.mock("/operate/v1/sign/list", "post", signList);
Mock.mock("/operate/v1/template/list", "get", templateList);
Mock.mock("/operate/v1/batchTask/list", "post", batchList);
