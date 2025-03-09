const runtime = useRuntimeConfig()
export default defineEventHandler(async event => {
  const body = await readBody(event)
  setCookie(event, "hstoken", body.id_token)
  console.log(body)
  await sendRedirect(event, "/") 
});