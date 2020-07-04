<template>
    <div>
       
	    <!-- content -->
	    <div class='content text-left'>
	    	<q-form v-if="!$user_info" @submit="loginUser()">
		     	<div class="field">
		       		<label>Username</label>
                    <label> </label>
		       		<div><q-input v-model="form_data.email" placeholder="Enter Email" outlined dense></q-input></div>
		       </div>

		        <div class="field q-mt-md">
		       		<label>Password</label>
		       		<div><q-input v-model="form_data.password" type="password" placeholder="Enter Password" outlined dense></q-input></div>
		       </div>
		       <div class="q-mt-lg"><q-btn type="submit" color="primary" unelevated class="full-width">Login</q-btn></div>
		       <div class="q-mt-sm"><q-btn type="button" v-close-popup color="primary" outline class="full-width">Cancel</q-btn></div>
	   		</q-form>

            <div class="text-center" v-else>
                <pre>{{ $user_info }}</pre>
                <q-btn @click="logout()" color="primary" unelevated>Logout</q-btn>
            </div>
	    </div>
    </div>
</template>

<script>
import { postLoginUser } from '../references/url';

export default
{
    data:() =>(
    {
        form_data:
        {
            email: 'paul@gmail.com',
            password: 'thisisme',
        },
    }),
    mounted()
    {
    },
    methods:
    {
        async loginUser()
        {
            this.$q.loading.show();
            let res = await this.$_post(postLoginUser, this.form_data);
            this.$q.loading.hide();

            if(res)
            {
                localStorage.setItem("auth", JSON.stringify(res.data));
                localStorage.setItem("token", res.data.token);
                this.$store.commit('user/updateUser', res.data);
            }
        },
        async logout()
        {
            this.$_logout();
        }
    }
}
</script>