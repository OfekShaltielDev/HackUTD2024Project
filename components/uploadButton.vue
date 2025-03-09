<template lang="pug">
input#images.rounded-md.outline-0.border-box.p-2( 
  style="border: 1px solid #c4c4c4;" 
  ref="fileuploading"
  type="file"  
  @change="fileUpload"
  accept=".png,.jpeg,.jpg,.gif" multiple)
</template>
  
<script setup lang="ts" >
const fileuploading = ref(null) 
const runtime = useRuntimeConfig()
const pinia = new  PinataSDK({
    pinataJwt: `${runtime.PINIA_JWT}`,
    pinataGateway: `${runtime.PINIA_GATEWAY}`
  })
import { PinataSDK } from 'pinata';
import FileUpload from 'primevue/fileupload';
    const fileUpload = async(event: Event) => {
        console.log("trying to upload")
        const image = ref(null)
        const Files = event?.target?.files
        //const Files = fileuploading.value?.files as unknown as any
        //console.log(Files)
        for(let i = 0 ; i < Files.length; i++) {
            const file: File = Files[i]
            //console.log(file)
            const fileContentsBuffer = await file.arrayBuffer()
            const fileContents = new Blob([fileContentsBuffer], { type: file.type as any})
           // console.log(fileContents)
            console.log(fileContents)
            //console.log(file)
            
            
            const fileUploadObj = new File([fileContents], file.name, {type: file.type as any})
            //await pinia.upload.private.file(fileUploadObj).group("01933714-2367-7c87-8892-057592d9ef7b")
            console.log(fileUploadObj)
            /*await $fetch('api/integrations/pinata/upload', {
             //       method: "post",
             //       body: {type: "image", name: file.name, size: file.size, file: file, faa: fileContents
            //       }
             //   })*/
            if(file.type === "mp4"){
                console.log("Todo: video")
            } else {
                //(file.type == "png" || file.type == "jpeg" || file.type == "svg")
                await $fetch('api/integrations/pinata/upload', {
                    method: "POST",
                    headers: {
                        "Content-Length": file.size,
                        "Content-Type": file.type,
                    },
                    body: file
                })
            } 
        }
        
        // todo: handle files
    }

</script>