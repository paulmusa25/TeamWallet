<template>
<div class="documentation">
{{ $user_info }}
<!-- markdown -->
<q-markdown >
What is Uniq App Builder?
===

__Hello World__ sa intoong lahat

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->

<!-- markdown -->
<q-markdown >

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>

export default
{
    data:() =>
    ({
        code: `<div>hellworld</div><div></div>`
    }),
    mounted() { },
    methods: { },
}
</script>