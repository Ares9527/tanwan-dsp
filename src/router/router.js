import Main from '@/views/Main.vue';
// Main 框架的外层


// 不作为Main组件的子页面,登录
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};


// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在 otherRouter 里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
    ]
};


// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/',
        icon: 'ios-home',
        name: 'overview',
        title: '账户总览',
        component: Main,
        children: [
            { path: 'index', title: '账户总览', name: 'home_index', component: () => import('@/views/home/home.vue')}
        ]
    },
    {
        path: '/time',
        icon: 'clock',
        title: '实时投放',
        name: 'time',
        access: 0,
        component: Main,
        children: [
            { path: 'plan', title: '实时投放计划', name: 'time_plan', access: 0, component: () => import('@/views/time/plan.vue') },
            { path: 'ad', title: '实时投放广告', name: 'time_ad', access: 0, component: () => import('@/views/time/ad.vue') },
        ]
    },
    {
        path: '/channel',
        icon: 'android-apps',
        title: '渠道信息',
        name: 'channel',
        access: 0,
        component: Main,
        children: [
            { path: 'product', title: '产品总览', name: 'channel_product', access: 0, component: () => import('@/views/channel/product.vue') },
            { path: 'media', title: '媒体总览', name: 'channel_media', access: 0, component: () => import('@/views/channel/media.vue') },
            { path: 'account', title: '账户总览', name: 'channel_account', access: 0, component: () => import('@/views/channel/account.vue') },
            { path: 'plan', title: '计划总览', name: 'channel_plan', access: 0, component: () => import('@/views/channel/plan.vue') },
            { path: 'ad', title: '广告位总览', name: 'channel_ad', access: 0, component: () => import('@/views/channel/ad.vue') }
        ]
    },
    {
        path: '/newsad',
        icon: 'ios-copy',
        name: 'newsad',
        title: '新建广告',
        component: Main,
        children: [
            { path: 'newsad', title: '新建广告', name: 'newsad_index', component: () => import('@/views/newsad/newsad.vue')}
        ]
    },
    {
        path: '/setid',
        icon: 'gear-a',
        name: 'setid',
        title: '账号管理',
        component: Main,
        children: [
            { path: 'setid', title: '账号管理', name: 'setid_index', component: () => import('@/views/setid/setid.vue')}
        ]
    }    
];
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter
];