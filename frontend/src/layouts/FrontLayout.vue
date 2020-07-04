<template>
    <q-layout class="main" view="hHh Lpr lFf">
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
<script>
import EssentialLink    from 'components/EssentialLink.vue'
import navigation       from '../references/nav'

export default
{
    name: 'FrontLayout',
    components: {
        EssentialLink
    },
	data: () =>
	({
		package_data: { version: '0.0.0' },
		leftDrawerOpen: false,
		navigation: [],
	}),
    mounted()
    {
        this.navigation = navigation;
    },
    methods:
    {
    },
}
</script>
