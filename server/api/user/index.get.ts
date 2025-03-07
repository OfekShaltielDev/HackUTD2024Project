import { PinataSDK } from "pinata";

export default defineEventHandler(async event => {
  const pinia = new  PinataSDK({
    pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjM2RmOTkwMi03MDhmLTQzNDgtODA4ZS1mZjk1NThiMDhjOGEiLCJlbWFpbCI6Im9mZWtqc2hhbHRpZWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjUwYjAzNWQ1MTY3ZjY2YzQ2N2JlIiwic2NvcGVkS2V5U2VjcmV0IjoiYjJiOGMzNWRhMDM1YTE4MDdjOWFjZjk5Y2JlNzRiN2RiNDA4MDY4MWIwODkzZTMxMjM5NjMwYjUwNjE4N2JmOSIsImV4cCI6MTc2MzMyNDY4MX0.swbzReX74FIfRfb0wOfxfmh47GzH79kBJMZ12n3b4OY"
    ,pinataGateway:"maroon-random-frog-53.mypinata.cloud"
  })
    type user = {
      first_name: string, 
      last_name: string,
      email: string,
      user_role: string
    }
    let users: user[] = []

    const pins = await pinia.files.list().group("01933714-6fb6-7246-9e8d-584322dc98eb")
    await Promise.all(pins.files.map(async(file: any) => {
        let user = (await pinia.gateways.get(file.cid)).data
        users.push(user as unknown as user)
      })
    )

    console.log(users)
    return users
  })
  