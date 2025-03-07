import { PinataSDK } from "pinata";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const pinia = new  PinataSDK({
        pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjM2RmOTkwMi03MDhmLTQzNDgtODA4ZS1mZjk1NThiMDhjOGEiLCJlbWFpbCI6Im9mZWtqc2hhbHRpZWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjUwYjAzNWQ1MTY3ZjY2YzQ2N2JlIiwic2NvcGVkS2V5U2VjcmV0IjoiYjJiOGMzNWRhMDM1YTE4MDdjOWFjZjk5Y2JlNzRiN2RiNDA4MDY4MWIwODkzZTMxMjM5NjMwYjUwNjE4N2JmOSIsImV4cCI6MTc2MzMyNDY4MX0.swbzReX74FIfRfb0wOfxfmh47GzH79kBJMZ12n3b4OY"
        ,pinataGateway:"maroon-random-frog-53.mypinata.cloud"
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
    const pin = await pinia.upload.json({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        user_role: body.user_role,
      }).group("01933714-6fb6-7246-9e8d-584322dc98eb");
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
