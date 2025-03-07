<script lang="ts" setup>

const hsuser = useCookie<any>('hsuser');
const hstoken = useCookie('hstoken');
const cuid = computed(() => hsuser.value?.cuid)
const isLoggedIn = computed(() => !hsuser.value)
const route = useRoute()
const toggle = ref(true);
console.log(route.path)


</script>

<template lang="pug">
ClientOnly
  .max-w-min.mx-auto.pt-3.flex.gap-2.mt-7(style="text-align:center")
    div.max-w-min.mx-auto.flex.gap-2(v-if="isLoggedIn")
      a.items-center.pt-5.px-2.py-2.text-sm.font-medium.rounded-md.text-blue-999.cursor-pointer(
      class='hover:text-black bg-white'  
      href="/api/logout"
      ) 
        p.uppercase.white.w-max.font-bold.text-orange-999 LOGOUT
      NavLinkButton( to='/Users' ) 
        p.uppercase.white.w-max Users
      NavLinkButton(to='/EditUser/0' ) 
        p.uppercase.white.w-max Invite user
      NavLinkButton(to="/" ) 
        p.uppercase.white.w-max Profile
      
</template>

<style scoped>
</style>
