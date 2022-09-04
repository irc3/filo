import { atom } from 'jotai'
import { Channel, Peer, Profile } from 'types'

// profile
export const profileAtom = atom<Profile | null>(null)

// connected
export const connectedAtom = atom(false)

// channels
export const channelsAtom = atom<Channel[]>([])

// directs
export const directsAtom = atom<Peer[]>([])
