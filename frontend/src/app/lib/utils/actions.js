'use server'

import { getSession, storeSession } from './auth'

export async function storeSessionAction(access_token, refresh_token) {
  return storeSession(access_token, refresh_token)
}

export async function getSessionAction() {
  return getSession()
}

export async function getAccessToken() {
  const session = getSession()
  return session?.access_token
}
