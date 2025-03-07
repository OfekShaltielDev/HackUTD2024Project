export default defineEventHandler(async event => {
    setCookie(event, "hstoken", "")
    setCookie(event, "hsuser", "")
    await sendRedirect(event, "/")
  })