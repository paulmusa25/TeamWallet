module.exports =
[
    {
        key: 'documentation_landing',
        label: 'Introduction',
        icon: 'fa fa-question',
        route: 'documentation_landing',
    },
    // {
    //     key: 'authenticator',
    //     label: 'Authenticator',
    //     icon: 'fa fa-key',
    //     route: 'authentication',
    // },
    {
        key: 'landing',
        label: 'Landing Page',
        icon: 'fa fa-home',
        sub:
        [
            { label: 'Login & Logout', route: 'documentation_login' },
            { label: 'Registration', route: 'documentation_registration'  },
            { label: 'Forgot Password', route: 'documentation_forgot_password'  },
            { label: 'Contact Us Form', route: 'documentation_contact_us'  },
        ]
    },
    {
        key: 'member',
        label: 'Member',
        icon: 'fa fa-users',
        sub:
        [
            { label: 'Update Profile', route: 'documentation_update_profile' },
        ]
    },
    {
        key: 'wallet',
        label: 'Wallet',
        icon: 'fa fa-wallet',
        sub:
        [
            { label: 'Send', route: 'documentation_wallet_send' },
            { label: 'Receive', route: 'documentation_wallet_receive' },
            { label: 'Transaction History', route: 'documentation_wallet_history' },
        ]
    },
]