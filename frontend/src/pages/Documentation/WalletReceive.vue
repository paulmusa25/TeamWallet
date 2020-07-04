<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Receive
===
</q-markdown>
<!-- /markdown -->

<div v-if="$token" class="component q-ma-lg">
    <div class="form-container">
        <u-q-wallet-receive></u-q-wallet-receive>
    </div>
</div>

<!-- markdown -->
<q-markdown >
This __component__ is for `Receive`

``` html
{{ code }}
```
</q-markdown>
<!-- /markdown -->

</div>
</template>

<script>
import UQWalletReceive from '../../components/UQWalletReceive'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-wallet-receive></u-q-wallet-receive>
    </div>
</div>`
    }),

    components: 
    { 
    	UQWalletReceive,
    },

    mounted()
    { },

    methods: 
    { },
}
</script>
