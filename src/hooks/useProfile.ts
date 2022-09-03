import { Profile } from 'types'
import { useAtomValue } from 'jotai'
import { profileAtom } from 'atoms'

const useProfile = () => {
  const profile = useAtomValue(profileAtom)
  return profile as Profile
}

export default useProfile
