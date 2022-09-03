import { atom } from 'jotai'
import { Profile } from 'types'

// profile
export const profileAtom = atom<Profile | null>(null)

// connected
export const connectedAtom = atom(false)
