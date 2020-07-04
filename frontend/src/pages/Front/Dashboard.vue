<!-- <template>
   <div>
       Front Dashboard
   </div>
</template>

<script>
export default
{
   data:() =>
   ({
   }),
   mounted()
   {
   },
   methods: { },
}
</script> -->

<template>
  <div class="q-pa-md" style="max-width: 300px">
    <q-input
      ref="input"
      filled
      v-model="model"
      label="Required: No Negative"
      hint="Validation starts after first blur"
      counter
      :rules="[
          val => !!val || '* Required',
          val => val >= 0 || 'Please input number more than 0'
        ]"
      lazy-rules
    />

    <q-btn class="q-mt-sm" label="Reset Validation" @click="reset" color="primary"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: ''
    }
  },

  methods: {
    reset () {
      this.$refs.input.resetValidation()
    }
  }
}
</script>