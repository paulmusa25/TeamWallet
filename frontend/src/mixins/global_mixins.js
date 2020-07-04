export default
{
    data: () =>
    ({
    }),
    computed:
    {
        $token()
        {
            return this.$store.state.user.token;
        },
        $user_info()
        {
            return this.$store.state.user.user_info;
        },
    },
    created()
    {
    },
    mounted()
    {
        // console.log(this.$token)
        // console.log(this.$user_info)
    },
    methods:
    {
        async $_logout()
        {
            this.$store.commit('user/updateUser', null);
            localStorage.removeItem("auth");
            localStorage.removeItem("token");
        },

        async $_post(url, data)
        {
            let res = null;

            // if(this.$token)
            // {
            //     // data.Authorization = this.$token;
            // }

            await this.$axios.post(url, data, {
                headers: {
                    'authorization': this.$token,
                }
            }).then((r) => {res = r}).catch((e) =>
            {
                this.$q.dialog({ title: `Something's not quite right`, message: e.response.data.message });
            });

            return res;
        },

        async $_get()
        {
            return await this.$axios.get(url, data).catch((e) =>
            {
                this.$q.dialog({ title: `Something's not quite right`, message: e.response.data.message });
            });
        },

        $_formatDate(date)
        {
            alert("date" + date);
        }
    }
}