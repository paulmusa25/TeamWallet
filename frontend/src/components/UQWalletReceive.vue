<template>
  <!-- Receive Component -->
  <div class='content text-left'>
    <label class="font-size-standard">Wallet Address</label>
    <q-input disable type="text" v-model="receive_wallet_address"/> 
    <div class="text-center q-mt-md">
      <q-btn @click="copy()" color="primary" label="Copy" />
    </div>

    <div v-if="showing == true">
      <q-tooltip v-model="showing">Wallet Address Copied !</q-tooltip>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar';
import { postWalletDetails } from '../references/url';

export default {
	data() 
  {
   return{
      receive_wallet_address: [],
      showing: false
      }
    },

  mounted() 
  {
    this.balance();
  },

  methods: 
  {
   async copy() {
      copyToClipboard(this.receive_wallet_address)
        .then(() => {
        this.showing = true
        })
        .catch(() => {
          alert('Copy Failed')
        })
    },

    async balance() {
      await this.$_post(postWalletDetails, { USER_ID: this.$user_info._id } )
        .then((response) => {
          this.receive_wallet_address = response.data.public_key
        })
    }
  }
}
</script>

<style type="text/css">
  .font-size-standard{
    font-size: 17px;
  }
</style>