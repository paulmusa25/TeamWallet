<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default
{
    name: 'App',
    mounted()
    {
        if(localStorage.auth)
        {
            this.$store.commit('user/updateUser', JSON.parse(localStorage.auth));
        }
    }
}
</script>
