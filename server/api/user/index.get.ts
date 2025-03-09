import { PinataSDK } from "pinata";
export default defineEventHandler(async event => {
  const runtime = useRuntimeConfig()
  const pinia = new PinataSDK({
    pinataJwt: `${runtime.PINIA_JWT}`,
    pinataGateway: `${runtime.PINIA_GATEWAY}`
  })
    type user = {
      first_name: string, 
      last_name: string,
      email: string,
      user_role: string
    }
    let users: user[] = []

    const pins = await pinia.files.private.list().group("01933714-6fb6-7246-9e8d-584322dc98eb")
    await Promise.all(pins.files.map(async(file: any) => {
        let user = (await pinia.gateways.private.get(file.cid)).data
        users.push(user as unknown as user)
      })
    )

    console.log(users)
    return users
  })
  