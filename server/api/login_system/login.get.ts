import { loginRedirectUrl } from "../integrations/auth0"

export default defineEventHandler(async event => {
  await sendRedirect(event, loginRedirectUrl() || "")
})