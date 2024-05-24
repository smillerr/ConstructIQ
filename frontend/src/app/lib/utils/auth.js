import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { refreshToken } from './utilFunctions'

export function storeSession(access_token, refresh_token, userData) {
  const session = {
    access: access_token,
    refresh: refresh_token,
    user: userData,
  }
  const expires = new Date(Date.now() + 60 * 5 * 1000)
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
  console.log('Inside middelware')
  // Refresh the session so it doesn't expire
  const parsedSession = JSON.parse(session)
  const refreshedSession = await refreshToken(parsedSession.refresh)
  console.log(refreshedSession)
  if (refreshedSession.valid === false) {
    console.log('Expired refresh token, must redirect to login')
  }
  delete refreshedSession.valid
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: JSON.stringify({
      user: parsedSession?.user || '',
      ...refreshedSession.res,
    }),
    expires: new Date(Date.now() + 60 * 5 * 1000),
  })
  return res
}
