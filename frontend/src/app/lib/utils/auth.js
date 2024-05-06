import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export function storeSession(access_token, refresh_token) {
  const session = { access_token, refresh_token }
  const expires = new Date(Date.now() + 86400 * 1000)
  cookies().set('session', JSON.stringify(session), { expires, httpOnly: true })
}

export function getSession() {
  const session = cookies().get('session')?.value
  if (!session) return null
  return JSON.parse(session)
}

export function updateSession(request) {
  const session = request.cookies.get('session')?.value
  if (!session) return
  // Refresh the session so it doesn't expire
  const parsedSession = JSON.parse(session)
  parsedSession.expires = new Date(Date.now() + 86400 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: JSON.stringify(parsedSession),
    expires: session.expires,
  })
  return res
}
