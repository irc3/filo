import { LOCAL_STORAGE_TOKEN } from 'consts'
import { atom } from 'jotai'
import { Profile } from 'types'
import { storage } from 'utils'

// auth token
export const tokenAtom = atom<string | null>(storage.get(LOCAL_STORAGE_TOKEN) as string | null)

// profile
export const profileAtom = atom<Profile | null>(null)
