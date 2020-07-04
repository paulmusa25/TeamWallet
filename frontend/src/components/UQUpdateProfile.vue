<template>
    <div>

	    <!-- content -->
	    <div class='content text-left'>
	    	<q-form @submit="findUser()">
		     	<div class="field">
		       		<label>Full Name</label>
		       		<div><q-input v-model="form_data.full_name" placeholder="Enter Email" outlined dense></q-input></div>
		       </div>
		       <div class="q-mt-lg"><q-btn type="submit" color="primary" unelevated class="full-width">Update Profile</q-btn></div>
	   		</q-form>
	    </div>
    </div>
</template>

<script>
import { postUpdateProfile } from '../references/url';

export default
{
    data:() =>(
    {
        form_data:
        {
            full_name: 'John Doe',
            email: 'guillermotabligan@gmail.com',
            password: 'water123',
            confirm_password: 'water123',
        },
    }),
    mounted()
    {

    },
    methods:
    {
        async findUser()
        {
            this.$q.loading.show();
            let res = await this.$_post(postUpdateProfile, this.form_data);
            this.$q.loading.hide();

            if(res)
            {
                this.$emit('success', res);
            }
        }
    }
}
</script>