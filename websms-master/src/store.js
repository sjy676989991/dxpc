import Vue from "vue";
import Vuex from "vuex";
import axios from "./util/http";
import _ from "lodash";

Vue.use(Vuex);


const subTree = (parentNode, allMenus) => {
    const children = _.sortBy(
        _.filter(
            allMenus,
            o =>
            o.depth === parentNode.depth + 1 &&
            o.lft > parentNode.lft &&
            o.rgt < parentNode.rgt
        ),
        ["lft"]
    );
    for (let i = 0; i < children.length; i += 1) {
        const child = children[i];
        const node = {...child, children: []};
        parentNode.children.push(node);
        subTree(node, allMenus);
    }
};


const store = new Vuex.Store({
    state: {
        //baseUrl: 'http://139.199.204.155:8999/',
        // baseUrl: 'http://qq397709884.e1.luyouxia.net:26928/',
        baseUrl: 'http://qq1355448983.w3.luyouxia.net/',
        token: null,
        userInfo: {},
        loading: false,
        // 菜单列表
        menus: [],
        // 菜单树
        menuTree: [],
        // 权限点列表
        authorities: [],

        // 分页控件的每页显示条目个数
        paginationPageSizes: [10, 20, 50, 100],
        // 分页控件组件布局，子组件名用逗号分隔
        paginationLayout: "total, sizes, prev, pager, next, jumper"
    },
    mutations: {

        setToken(state, newToken) {
            localStorage.setItem("token", newToken);
            state.token = newToken;
        },

        setUserInfo(state, userInfo){
            localStorage.setItem('userInfo', userInfo);
            state.userInfo = userInfo;
        },
        setMenus(state, menus) {
            state.menus = menus;
        },
        setMenuTree(state, menuTree) {
            state.menuTree = menuTree;
        },
        setAuthorities(state, authorities) {
            state.authorities = authorities;
        }
    },
    actions: {
        /**
         * 重新从服务器读取用户信息
         *
         * @param context
         * @returns {Promise.<TResult>|*}
         */
        reloadUserAuthority(context) {
            const menus = [
                {
                    menuId: 1,
                    menuName: "根节点",
                    menuCode: "root",
                    link: "/root",
                    icon: "el-icon-menu",
                    lft: 1,
                    rgt: 22,
                    depth: 0
                },
                {
                    menuId: 2,
                    menuName: "首页",
                    menuCode: "dashboard",
                    link: "/dashboard",
                    icon: "el-icon-menu",
                    lft: 2,
                    rgt: 3,
                    depth: 1
                },
                {
                    menuId: 10,
                    menuName: "账号设置",
                    menuCode: "person",
                    link: "/person",
                    icon: "el-icon-setting",
                    lft: 4,
                    rgt: 5,
                    depth: 1
                },
                {
                    menuId: 3,
                    menuName: "签名",
                    menuCode: "sign",
                    link: "/sign",
                    icon: "el-icon-view",
                    lft: 4,
                    rgt: 5,
                    depth: 1
                },
                {
                    menuId: 4,
                    menuName: "模板管理",
                    menuCode: "template",
                    link: "/template",
                    icon: "el-icon-date",
                    lft: 6,
                    rgt: 6,
                    depth: 1
                },

                {
                    menuId: 5,
                    menuName: "发送短信",
                    menuCode: "sms",
                    link: "/sms",
                    icon: "el-icon-bell",
                    lft: 7,
                    rgt: 8,
                    depth: 1
                },
                {
                    menuId: 6,
                    menuName: "批次任务",
                    menuCode: "batch",
                    link: "/batch",
                    icon: "el-icon-location",
                    lft: 9,
                    rgt: 10,
                    depth: 1
                },
                {
                    menuId: 7,
                    menuName: "发送记录",
                    menuCode: "mt",
                    link: "/mt",
                    icon: "el-icon-news",
                    lft: 11,
                    rgt: 12,
                    depth: 1
                },
                {
                    menuId: 8,
                    menuName: "上行记录",
                    menuCode: "mo",
                    link: "/mo",
                    icon: "el-icon-tickets",
                    lft: 13,
                    rgt: 14,
                    depth: 1
                },
                {
                    menuId: 9,
                    menuName: "充值记录",
                    menuCode: "recharge",
                    link: "/recharge",
                    icon: "el-icon-tickets",
                    lft: 15,
                    rgt: 21,
                    depth: 1
                },
                {
                    menuId: 1,
                    menuName: "短信充值",
                    menuCode: "recharge",
                    link: "/recharge",
                    icon: "el-icon-tickets",
                    lft: 16,
                    rgt: 17,
                    depth: 2
                },
                {
                    menuId: 2,
                    menuName: "充值任务记录",
                    menuCode: "rechargelist",
                    link: "/rechargeList",
                    icon: "el-icon-tickets",
                    lft: 18,
                    rgt: 19,
                    depth: 2
                },
                {
                    menuId: 3,
                    menuName: "用户套餐包列表",
                    menuCode: "bag",
                    link: "/bag",
                    icon: "el-icon-tickets",
                    lft: 20,
                    rgt: 21,
                    depth: 2
                },
            ];

            const authorities = [
                {authority_id: 1, authority_code: "success", authority_name: "配送成功"},
            ];


            return axios.get("platform/v1/userInfo").then(response => {
                const data = response.data;
                if (data.data.username) {
                    context.commit("setUserInfo", data.data);
                    const rootMenu = _.find(menus, {menuCode: "root"});
                    const rootMenuNode = {...rootMenu, children: []};
                    subTree(rootMenuNode, menus);
                    context.commit("setMenus", menus);
                    context.commit("setMenuTree", rootMenuNode.children);
                    context.commit("setAuthorities", authorities);
                } else {
                    this.$message.error(data.message);
                }
            });
        },

        /**
         * 退出
         *
         * @param context
         */
        signOut(context) {
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            context.commit("setToken", null);
            context.commit("setUserInfo", {});
            context.commit("setMenus", []);
            context.commit("setAuthorities", []);
        }

    }
});

export default store;