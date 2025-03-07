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
    pinataGateway:`${runtime.Gateway}`,
  });
  event.context.pinata = pinataInstance
  const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
const upload = await 
event.context.pinata.upload.file(file);
  const hstoken = getCookie(event, 'hstoken') || ''
  if(hstoken){
    try {
      const claims: any = jwt.verify(hstoken, fs.readFileSync(process.cwd() + '/cert-dev.pem'))
      if(claims instanceof Object && "nonce" in claims){
        event.context.claims = claims
        const id = claims['sub']
        const email = claims['email']
        const user = await event.context.pinata.Gateway.get(claims['cid'])
        if(user){
          setCookie(event, 'hsuser', JSON.stringify(user))
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



