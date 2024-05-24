'use server'

import { getSession, storeSession } from './auth'

export async function storeSessionAction(
  access_token,
  refresh_token,
  userData,
) {
  return storeSession(access_token, refresh_token, userData)
}

export async function getSessionAction() {
  return getSession()
}

export async function getAccessToken() {
  const session = getSession()
  return session?.access
}
