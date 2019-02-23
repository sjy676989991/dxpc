import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import _ from 'lodash';

Vue.use(Router);


export const constantRouter = [
    {
        path: "/",
        name: "signIn",
        component: () => import("@/views/SignIn.vue"),
        meta: {anonymous: true}
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
        meta: {anonymous: true}
    },
];

export const asyncRouter = [
    {
        path: "/dashboard",
        component: () => import("@/views/layout/BasicLayout.vue"),
        children: [
            {
                path: "/",
                name: "dashboard",
                component: () => import("@/views/Dashboard.vue"),
                meta: {menuName: "概览"}
            },
            {
                path: "/person",
                name: "person",
                component: () => import("@/views/person/Index.vue"),
                meta: {menuName: "账号设置"}
            },
            {
                path: "/sign",
                name: "sign",
                component: () => import("@/views/sign/Index.vue"),
                meta: {menuName: "签名管理"}
            },
            {
                path: "/template",
                name: "template",
                component: () => import("@/views/template/Index.vue"),
                meta: {menuName: "模板管理"}
            },
            {
                path: "/sms",
                name: "sms",
                component: () => import("@/views/sms/Index.vue"),
                meta: {menuName: "发送短信"}
            },
            {
                path: "/batch",
                name: "batch",
                component: () => import("@/views/batch/Index.vue"),
                meta: {menuName: "批次任务"}
            },
            {
                path: "/mt",
                name: "mt",
                component: () => import("@/views/mt/Index.vue"),
                meta: {menuName: "发送记录"}
            },
            {
                path: "/mo",
                name: "mo",
                component: () => import("@/views/mo/Index.vue"),
                meta: {menuName: "上行记录"}
            },
            {
                path: "/recharge",
                name: "recharge",
                component: () => import("@/views/recharge/Index.vue"),
                meta: {menuName: "充值记录"}
            },
            {
                path: "/rechargeList",
                name: "rechargeList",
                component: () => import("@/views/rechargeList/Index.vue"),
                meta: {menuName: "充值任务记录"}
            },
            {
                path: "/doc",
                name: "doc",
                component: () => import("@/views/doc/Index.vue"),
                meta: {menuName: "接口文档"}
            }
        ]
    },
    {
        path: "/system",
        component: () => import("@/views/layout/BasicLayout.vue"),
        children: [
            {
                path: "/system/profile",
                name: "profile",
                component: () => import("@/views/system/Profile.vue")
            },
            {
                path: "/system/user",
                name: "user",
                component: () => import("@/views/system/User.vue")
            }
        ]
    }
];

const router = new Router({routes: constantRouter});

// 是否有权限访问某个路径
const hasPermission = toPath => {
    const links = _.map(store.state.menus, "link");
    return _.indexOf(links, toPath) > 0;
};

// 根据菜单生成路由的菜单元数据
const generateMenuName = route => {
    const menu = _.find(store.state.menus, {link: route.path});
    if (!menu) {
        return;
    }
    const menuName = menu.menuName;
    if (route.meta) {
        route.meta.menuName = menuName;
    } else {
        route.meta = {menuName};
    }
    _.forEach(route.children, child => {
        generateMenuName(child);
    });
};

// 动态生成路由表
const generateRoutes = () =>
    _.filter(asyncRouter, route => {
        const flag = hasPermission(route.path);
        if (flag) {
            generateMenuName(route);
        }
        return flag;
    });

// 导航之前拦截器
router.beforeEach((to, from, next) => {
    if (to.meta.anonymous) {
        next();
        return;
    }

    // 没有Token，尝试从本地存储中重新加载Token
    if (store.state.token == null) {
        const token = localStorage.getItem("token");
        if (token != null && token.toUpperCase() !== "NULL") {
            store.commit("setToken", token);
        }
    }

    // 有Token
    if (store.state.token != null) {
        // 没有菜单信息，重新从服务器加载菜单
        if (store.state.menus.length === 0) {


            store
                .dispatch("reloadUserAuthority")
                .then(() => {
                    const routes = generateRoutes();
                    router.addRoutes(routes);
                    next({...to, replace: true});
                })
                .catch(() => {
                    next("/");
                });
        } else if (hasPermission(to.path)) {
            next();
        } else {
            // 无权限访问，返回到登陆页面
            next("/");
        }
    } else {
        // 本地没有Token，需要重新登陆
        next("/");
    }
});
export default router;