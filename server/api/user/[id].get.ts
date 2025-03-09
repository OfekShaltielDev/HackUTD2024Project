import { PinataSDK } from "pinata";

export default defineEventHandler(async event => {
const id = getRouterParam(event, 'id');
const pin = await event.context.pinata.Gateway.get(id as string)
    /*const queryRes = await event.context.client.user.findFirst({
        where: {
            id: id as string
        }
    })*/

    return pin
})
