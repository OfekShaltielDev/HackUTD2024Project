import { PinataSDK } from "pinata";

export default defineEventHandler(async event => {
const body = await readBody(event);
console.log(body)
//const imageStuff = new Blob(body.faa, {type: body.type as any})
//const fileUploadObj = new File([imageStuff], body.name, {type: body.type as any})
//console.log(fileUploadObj)
    let pin = null
    try {
        pin = await event.context.pinia.upload.private.file(body).group("01933714-2367-7c87-8892-057592d9ef7b")
    
    } catch(e){
        console.error(e)
    }
        
          return pin
})
