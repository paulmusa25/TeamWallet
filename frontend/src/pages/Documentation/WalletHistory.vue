<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Transaction History
===

</q-markdown>
<!-- /markdown -->

<div v-if="$token" class="component q-ma-lg">
    <div class="form-container">
        <u-q-wallet-history @success="success()"></u-q-wallet-history>
    </div>
</div>

<!-- markdown -->
<!-- <q-markdown >

The __code above__ can be `bla blab abla`

``` html
{{ code }}
```

</q-markdown> -->
<!-- /markdown -->


</div>
</template>

<script>
import UQWalletHistory from '../../components/UQWalletHistory'

export default
{
    data:() =>
    ({
        code: `<div>hellworld</div><div></div>`
    }),
    components: { UQWalletHistory },
    mounted()
    {
    },
    methods:
    {
    },
}
</script>