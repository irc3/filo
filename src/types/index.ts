import type { IClientMeta } from '@walletconnect/types'

export interface WalletSession {
  connected: boolean;
  accounts: string[];
  chainId: number;
  bridge: string;
  key: string;
  clientId: string;
  clientMeta: IClientMeta | null;
  peerId: string;
  peerMeta: IClientMeta | null;
  handshakeId: number;
  handshakeTopic: string;
}

export type Profile = WalletSession

export interface Peer {
  id: string
  name: string
  avatar?: string
}

export interface Channel {
  id: string
  name: string
}
