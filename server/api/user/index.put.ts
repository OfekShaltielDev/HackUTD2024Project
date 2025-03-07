import {loginRedirectUrl} from "../integrations/auth0"

/*  /EditUser/cuid
*	  function:	PUT
*	  submit user account details to database
*/

export default defineEventHandler(async event => {
const body = await readBody(event);
    await fetch('', {
        method: 'put',
        headers: {

        }
    })
    const queryRes = await event.context.client.user.update({
    where: {
        cuid: body.cuid
    },
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
    
          return queryRes
})
