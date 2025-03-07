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
const pinia = new  PinataSDK({
    pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjM2RmOTkwMi03MDhmLTQzNDgtODA4ZS1mZjk1NThiMDhjOGEiLCJlbWFpbCI6Im9mZWtqc2hhbHRpZWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjUwYjAzNWQ1MTY3ZjY2YzQ2N2JlIiwic2NvcGVkS2V5U2VjcmV0IjoiYjJiOGMzNWRhMDM1YTE4MDdjOWFjZjk5Y2JlNzRiN2RiNDA4MDY4MWIwODkzZTMxMjM5NjMwYjUwNjE4N2JmOSIsImV4cCI6MTc2MzMyNDY4MX0.swbzReX74FIfRfb0wOfxfmh47GzH79kBJMZ12n3b4OY"
    ,pinataGateway:"maroon-random-frog-53.mypinata.cloud"
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
            //await pinia.upload.file(fileUploadObj).group("01933714-2367-7c87-8892-057592d9ef7b")
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