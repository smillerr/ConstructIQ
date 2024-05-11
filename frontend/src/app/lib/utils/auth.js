import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export function storeSession(access_token, refresh_token) {
  const session = { access_token, refresh_token }
  console.log('inside storeSession', session.access_token)
  const expires = new Date(Date.now() + 86400 * 1000)
  cookies().set('session', JSON.stringify(session), { expires, httpOnly: true })
}

export function getSession() {
  const session = cookies().get('session')?.value
  if (!session) return null
  return JSON.parse(session)
}

export async function updateSession(request) {
  const session = request.cookies.get('session')?.value
  if (!session) return
  //TODO: Get new access and refresh token with the current refresh token
  // Refresh the session so it doesn't expire
  const parsedSession = JSON.parse(session)
  /*
  const refreshedSession = await refreshToken(parsedSession.refresh_token)
  console.log('inside middelware', refreshedSession.refresh)
  */
  // TODO: Get both access and refresh token from the response, later on, store them in the cookie,
  // ? if the token is expired, redirect to login page or delete the cookie?

  parsedSession.expires = new Date(Date.now() + 86400 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: JSON.stringify(parsedSession),
    expires: session.expires,
  })
  return res
}
