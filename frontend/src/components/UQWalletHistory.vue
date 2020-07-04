<template>
    <div>
        <!-- Content -->
        <div class="column" v-for="(transaction, index) in transaction_list.transaction" :key="transaction._id" style="border-bottom: 1px solid #ebebeb">
            <div class="row items-start">
                <div class="column items-start">
                    <div class="col" v-if="transaction.sender == transaction_list.public_key">
                        <i class="fas fa-share" style="color: red" ></i> Sent to {{ transaction_list.user[index] }}
                    </div>

                    <div class="col" v-if="transaction.receiver == transaction_list.public_key">
                        <i class="fas fa-share fa-rotate-180" style="color: green"></i> Received from {{ transaction_list.user[index] }}
                    </div>
                    <br/>
                    <div class="col" style="color: gray; margin-left: 15px;">
                        Transaction successful
                        </div>
                </div>
                <div class="col">
                    <div class="column items-end">
                        <div class="col" v-if="transaction.sender == transaction_list.public_key" style="color: red">
                            -$ {{ transaction.amount }} USD
                        </div>
                        <div class="col" v-if="transaction.receiver == transaction_list.public_key" style="color: green">
                            +$ {{ transaction.amount }} USD
                        </div>
                        <div class="col">
                            {{ new Date(transaction.date_created).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"}) }}
                        </div>
                        <div class="col">
                            {{ new Date(transaction.date_created).toLocaleDateString() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { postTransactionHistory } from '../references/url';

export default
{
    data:() =>(
    {
        transaction_list: [],
    }),
    mounted()
    {
        this.getTransactionHistory();
    },
    methods:
    {
        async getTransactionHistory()
        {
            if(this.$token)
            {
                this.$q.loading.show();
                await this.$_post(postTransactionHistory, {USER_ID: this.$user_info._id}).then((res) => {
                    this.transaction_list   = res.data
                });
                this.$q.loading.hide();
            }
        }
    }
}
</script>
