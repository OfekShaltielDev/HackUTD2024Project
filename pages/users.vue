<script lang = "ts" setup>
import { ChevronUpIcon, ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

const users = ref<any>([])
const hsuser = useCookie('hsuser')
const currentPage  = ref(0)


//page sorting
const order = ref('')
const OrderField = ref('')

function SortCV(users:any, OrderFields:string){
  OrderField.value = OrderFields as string
  if (order.value === ''){
    order.value = 'desc'
   } else if (order.value === 'desc') {
    order.value = 'asc'
   } else if (order.value === 'asc') {
    OrderField.value = ''
    order.value = ''
   }
   getDataUsers()
}

// Method that retrieves all the authenticated users on the website (advocates and family members)
const getDataUsers = async () => {
    const { data: usersData } = await useFetch('/api/user', {
        method: 'GET',
        query: { page_number: currentPage, sortedColumn:OrderField.value, order:order.value }, 
        watch: [currentPage]
    })
    users.value = usersData.value as unknown as any[];
    console.log(users.value)
}




await getDataUsers()
</script>

<template lang = "pug">
.container.bg-white.mx-auto.mt-1(class="sm:w-[600px] sm:h-[75px]" )
    table.ml-8(style="table-layout: auto;")
        thead
            tr
                th.font-poppins.font-bold.font-bold.p-2(style="color: white;--tw-bg-opacity: 1; background-color:#808080;border-radius: 15px 0px 0px 0px; width:25%; overflow: hidden")
                    button(@click="SortCV(users, 'last_name')") User Name &nbsp;
                    span(v-if="order === 'asc' && OrderField==='last_name'" style="padding-right:3px; padding-top: 3px;")
                    span(v-else-if="order === 'desc' && OrderField==='last_name'" style="padding-right:3px; padding-top: 3px;")
                    span(v-else style="padding-right:3px; padding-top: 3px;")
                th.font-poppins.font-bold(style="color: white; width: 12.5%; --tw-bg-opacity: 1; background-color: #808080;")
                    button(@click="SortCV(users, 'user_role')") User Role &nbsp;
                    span(v-if="order === 'asc' && OrderField==='user_role'" style="padding-right:3px; padding-top: 3px;")
                    span(v-else-if="order === 'desc' && OrderField==='user_role'" style="padding-right:3px; padding-top: 3px;")
                    span(v-else style="padding-right:3px; padding-top: 3px;")
                th.font-poppins.font-bold(style="color: white; --tw-bg-opacity: 1; background-color: #808080;border-radius: 00px 15px 0px 00px;overflow: hidden")
                    button(@click="SortCV(users, 'email')") User Email &nbsp;
                    span(v-if="order === 'asc' && OrderField==='email'" style="padding-right:3px; padding-top: 3px;")
                    span(v-else-if="order === 'desc' && OrderField==='email'" style="padding-right:3px; padding-top: 3px;")
                    span(v-else style="padding-right:3px; padding-top: 3px;")
            tr(v-for="(item, i) in users" 
                :key="i"
                :class="{'bg-gray-200': (i+1) % 2}" 
            )
                td.font-poppins.text-gray-dark.font-bold(style="text-align: center") {{ item.first_name + " " + item.last_name }}
                td.font-poppins.text-gray-dark.font-bold(style="text-align: center") {{ item.user_role }}
                td.font-poppins.text-gray-dark.font-bold(style="text-align: center") {{ item.email }}
</template>
