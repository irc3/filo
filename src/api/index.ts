import { invoke, InvokeArgs } from '@tauri-apps/api/tauri'
import { Channel, Peer } from 'types'

const tauriApi = <Result = any, Params extends InvokeArgs | never = never>(cmd: string) =>
  (...params: Params extends never ? [] : [Params]): Promise<Result> => {
    return invoke<Result>(cmd, params?.[0] ?? {})
}

export const getContacts = tauriApi<
  {
    channels: Channel[],
    directs: Peer[]
  }
>('get_contacts')
