import { logoutRedirectUrl } from "../integrations/auth0"

export default defineEventHandler(async event => {
  const id_token = getCookie(event, "hstoken")
  await sendRedirect(event, logoutRedirectUrl(id_token as string) || "")
})