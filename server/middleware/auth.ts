import jwt from "jsonwebtoken"
import fs from 'fs'
import { logoutRedirectUrl } from "../api/integrations/auth0"
import { PinataSDK } from "pinata"
//import { PrismaClient } from "@prisma/client"

//const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  //event.context.prisma = prisma
  const runtime = useRuntimeConfig()
  const pinataInstance = new PinataSDK({
    pinataJwt: `${runtime.PINIA_JWT}`,
    pinataGateway:`${runtime.PINIA_GATEWAY}`,
  });
  event.context.pinata = pinataInstance
  const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
const upload = await 
event.context.pinata.upload.private.file(file);
  const hstoken = getCookie(event, 'hstoken') || ''
  if(hstoken){
    try {
      const claims: any = jwt.verify(hstoken, fs.readFileSync(process.cwd() + '/cert-dev.pem'))
      if(claims instanceof Object && "nonce" in claims){
        event.context.claims = claims
        const id = claims['sub']
        const email = claims['email']
        const user = await event.context.pinata.files.private.list().name(email)
        if(user){
          console.log('start user logs')
          console.log(user)
          console.log('end user logs')
          const { data, contentType } = await event.context.pinata.gateways.private.get(
            user.files[0].cid
          )
          
          setCookie(event, 'hsuser', JSON.stringify(data))
        } else {
          setCookie(event, 'hsuser', '')
        }
      }
    } catch (error) {
      console.error(error)
      setCookie(event, 'hstoken', '')
      return await sendRedirect(event, logoutRedirectUrl(hstoken))
    }
  } else {
    setCookie(event, 'hsuser', '')
    setCookie(event, 'hstoken', '')
  }
})



