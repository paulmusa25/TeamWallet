
const routes =
[
    {
        path: '/',
        component: () => import('layouts/FrontLayout.vue'),
        children:
        [
            { name: 'front_dashboard', path: '', component: () => import('pages/Front/Dashboard.vue') },
            // { name: 'front_login', path: 'landing', component: () => import('pages/Front/Login.vue') },
        ]
    },
    {
        path: '/documentation',
        component: () => import('layouts/DocumentationLayout.vue'),
        children:
        [
            { name: 'documentation_landing', path: '', component: () => import('pages/Documentation/Landing.vue') },
            { name: 'documentation_login', path: 'login', component: () => import('pages/Documentation/Login.vue') },
            { name: 'documentation_registration', path: 'registration', component: () => import('pages/Documentation/Registration.vue') },
            { name: 'documentation_update_profile', path: 'update_profile', component: () => import('pages/Documentation/UpdateProfile.vue') },
            { name: 'documentation_wallet_send', path: 'wallet_send', component: () => import('pages/Documentation/WalletSend.vue') },
            { name: 'documentation_wallet_receive', path: 'wallet_receive', component: () => import('pages/Documentation/WalletReceive.vue') },
            { name: 'documentation_wallet_history', path: 'wallet_history', component: () => import('pages/Documentation/WalletHistory.vue') },


        ]
    },
    {
        path: '/member',
        component: () => import('layouts/FrontLayout.vue'),
        children:
        [
            // { name: 'member_update_profile', path: 'update_profile', component: () => import('pages/Member/Dashboard.vue') },
            // { name: 'front_login', path: 'landing', component: () => import('pages/Front/Login.vue') },
        ]
    },
    // {
    //     path: '/',
    //     component: () => import('layouts/DocumentationLayout.vue'),
    //     children:
    //     [
            
    //     ]
    // },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
