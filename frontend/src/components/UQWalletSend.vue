<template>
  <div>
    <!-- Send Component -->
    <div v-if="is_show_squestion_password == false"
    class='content text-left'>
    
      <!-- Balance -->
      <div class="text-center icon">
        <!-- <label>Balance</label> -->
        <i class="fa fa-wallet q-mr-sm"></i>
        <span id="balance">
         <strong>
          {{ wallet_details.balance }} USD
         </strong>
        </span>
      </div>

      <q-form @submit="notEnoughBalance()">
        <div class="field q-my-lg">
          <label class="font-size-standard">To</label>
          <q-input v-model='send_form_data.receiver' type="text" placeholder="Wallet Address" class="q-mt-sm" required outlined dense/>
        </div>
        <div class="field">
          <label>Amount</label>
          <q-input v-model.number='send_form_data.amount' type="number" placeholder="Amount" class="q-mt-sm" required outlined dense/>
        </div>
        <div class="field q-my-lg">
          <label>Remarks</label>
          <div>
              <q-input
                v-model="text"
                placeholder="(Optional)"
                autogrow
                filled
                outlined 
                dense
              />
          </div>
        </div>
        <div class="text-center q-mt-md">
          <q-btn type="submit" color="secondary">Send</q-btn>
        </div>
      </q-form>
    </div>

    <!-- Security Question and Password -->
    <div v-else v-model="is_show_squestion_password">
      <q-form @submit="send()" class='content text-left' >
        <div>
          <label class="font-size-standard">Security Question</label>
          <q-select filled v-model="send_form_data.security_question" :options="questions_list" class="q-mt-sm"/>
          <q-input v-model="send_form_data.security_answer" type="text" placeholder="Answer" class="q-mt-sm"/>
        </div>
        <div class="q-mt-lg">
          <label class="font-size-standard">Password</label>
          <q-input v-model="send_form_data.password" required type="password" placeholder="Input Password" />
        </div>
        <div class="text-center q-mt-lg">
          <q-btn type="submit" color="primary">Submit</q-btn>
        </div>
      </q-form>
    </div>

    <!-- Sent Success Message -->
    <q-dialog v-model="is_show_send_success" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section align="center">
          <div class="text-h6">Send Transaction Success</div>
        </q-card-section>
        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn @click="backToSend()" flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Error Message 1 -->
    <q-dialog v-model="is_show_error_balance" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-warning text-white" style="width: 300px">
        <q-card-section align="center">
          <div class="text-h6">Your balance is not enough</div>
        </q-card-section>
        <q-card-actions align="center" class="bg-white text-dark">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Error Message 2 -->
    <q-dialog v-model="is_show_error_balance2" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-negative text-white" style="width: 300px">
        <q-card-section align="center">
          <div class="text-h6">You cannot send below zero</div>
        </q-card-section>
        <q-card-actions align="center" class="bg-white text-dark">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import 
{ 
  postWalletSend,
  postWalletDetails 
} 
from '../references/url';
import questions          from '../references/questions';

export default {
	data() {
			return{
        is_show_squestion_password: false,
        is_show_send_success: false,
        is_show_error_balance: false,
        is_show_error_balance2: false,
	      send_form_data: {
	        receiver: '',
	        amount: null,
          security_question: 'In what city did you meet your spouse/significant other?',
          security_answer: '',
          password: ''
	      },
        questions_list: questions,
        wallet_details: []
		}
	},

  	async mounted() {
      await this.balance();
  	},

  	methods: {
      async send() {
        this.$q.loading.show();
        this.send_form_data.sender  = this.wallet_details.public_key;
        this.send_form_data.USER_ID = this.$user_info._id;
        let res = await this.$_post(postWalletSend, this.send_form_data);
        this.$q.loading.hide();

        if(res)
        {
          this.is_show_send_success = true;
          this.$emit('Send Transaction Success!', res);
        }
      },

      async backToSend() {
           window.location.reload();
      },

      async balance() {
        await this.$_post(postWalletDetails, { USER_ID: this.$user_info._id } )
          .then((response) => {
            this.wallet_details = response.data
          })
      },

      async notEnoughBalance() {
        if(this.send_form_data.amount > this.wallet_details.balance)
        {
          this.is_show_error_balance = true;
        }
        else if(this.send_form_data.amount < 0)
        {
          this.is_show_error_balance2 = true;
        }
        else
        {
          this.is_show_squestion_password = true;
        }
      }
  }
}
</script>

<style type="text/css">
  #balance, .font-size-standard{
    font-size: 17px;
  }

  .fa-wallet{
    font-size: 27px;
  }
</style>