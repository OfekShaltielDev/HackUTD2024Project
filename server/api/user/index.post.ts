import { PinataSDK } from "pinata";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const runtime = useRuntimeConfig();
    const pinia = new PinataSDK({
        pinataJwt:`${runtime.PINIA_JWT}`,
        pinataGateway: `${runtime.PINIA_GATEWAY}`
      })

    const dump =  JSON.stringify(
        { "email": body.email,
        "first_name": body.first_name,
        "middle_name": body.middle_name,
        "last_name": body.last_name,
        "user_role": body.role,
         })
        console.log(body)
    const blob = new Blob([dump], {type: 'string'})
    const fileUploadObj = new File([blob], body.email, {type: 'string'})
    const pin = await pinia.upload.private.json({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        user_role: body.user_role,
      }).group("01933714-6fb6-7246-9e8d-584322dc98eb").name(body.email);
    //todo: replace this
    /*const queryRes = await event.context.client.user.create({
        data: {
            email: body.email,
            first_name: body.first_name,
            middle_name: body.middle_name,
            last_name: body.last_name,
            user_role: 'family',
            familyCuid: body.familyCuid || null,
            phone: body.phone,
            address: body.address
            //...body

            }  
            });
     */   
    return pin
})
