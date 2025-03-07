<template lang="pug">
NuxtLink.items-center.pt-5.px-2.py-2.text-sm.font-medium.rounded-md.cursor-pointer.no-border.relative(style="text-align:center;" :to="to" active-class="active")
  span.button-content
    slot
</template>
        
<script setup lang="ts">
const props = defineProps<{ to: string }>()
</script>
        
<style scoped>

  
</style>
        