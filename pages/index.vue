<template lang="pug">
    div.ml-20
      uploadButton.ml-8
    .mb-20
    .container.overflow-hidden.mt-4.mx-auto
      .text-white.w-full.m-0.text-3xl.font-poppins.font-bold.text-center.drop-shadow-sm.p-10(v-if="isAdmin" class="sm:text-5xl" style="text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.25); --tw-bg-opacity: 1; background-color: #5aadc2;") Admin Profile
      .text-white.w-full.m-0.text-3xl.font-poppins.font-bold.text-center.drop-shadow-sm.p-10(v-else class="sm:text-5xl" style="text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.25); --tw-bg-opacity: 1; background-color: #5aadc2;") User Profile
      .flex.flex-col.justify-start.gap-6(class="sm:grid sm:gap-10 sm:grid-rows-3 sm:grid-cols-2 sm:my-12")
        TextGrayField(class="sm:mx-auto") Name:
        TextGrayField {{ cvuser?.first_name }} {{ cvuser?.last_name }}
        TextGrayField(class="sm:mx-auto") Email:
        TextGrayField {{ cvuser?.email }}
  </template>
  
<script setup lang="ts">
  type user = {
        cuid: string,
        first_name: string, 
        last_name: string,
        email: string,
        user_role: string
  }
  const cvuser = useCookie<user>('hsuser');
  const isAdmin = computed(() => cvuser.value?.user_role == 'admin');
</script>