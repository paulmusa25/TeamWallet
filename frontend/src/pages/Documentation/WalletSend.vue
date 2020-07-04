<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Send
===
</q-markdown>
<!-- /markdown -->

<div v-if="$token" class="component q-ma-lg">
    <div class="form-container">
        <u-q-wallet-send></u-q-wallet-send>
    </div>
</div>

<!-- markdown -->
<q-markdown >
This __component__ is for `Send`

``` html
{{ code }}
```
</q-markdown>
<!-- /markdown -->

</div>
</template>

<script>
import UQWalletSend from '../../components/UQWalletSend'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-wallet-send></u-q-wallet-send>
    </div>
</div>`
    }),

    components: 
    { 
    	UQWalletSend,
    },

    mounted()
    { },

    methods: 
    { },
}
</script>
