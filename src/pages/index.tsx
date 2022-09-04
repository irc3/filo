import React, { useEffect, useState } from 'react'
import useTranslation from 'hooks/useTranslation'
import useProfile from 'hooks/useProfile'
import Toolbar from 'components/toolbar'
import {
  ChatOutlined,
  UserOutlined,
  ChevronDownOutlined,
  ChevronRightOutlined
} from '@emmda-design/icons'
import Contact from 'components/contact'
import { useAtom } from 'jotai'
import { channelsAtom, directsAtom } from 'atoms'
import { getContacts } from 'api'
import Image from 'components/image'

export default function Index () {
  const { t } = useTranslation()

  const profile = useProfile()
  const [foldChannels, setFoldChannels] = useState(false)
  const [foldDirects, setFoldDirects] = useState(false)
  const [directs, setDirects] = useAtom(directsAtom)
  const [channels, setChannels] = useAtom(channelsAtom)
  const [activeContactId, setActiveContactId] = useState<string | null>(null)

  useEffect(() => {
    getContacts()
      .then(contacts => {
        setChannels(contacts.channels)
        setDirects(contacts.directs)
      })
      .catch(console.error)
  }, [])

  const toggleFoldChannels = () => setFoldChannels(v => !v)
  const toggleFoldDirects = () => setFoldDirects(v => !v)

  return (
    <div className='home flex flex-col justify-center items-center h-full'>
      <Toolbar />
      <div className='flex w-full flex-1'>
        <div className='contacts w-5/12 max-w-xs flex flex-col p-4'>
          <div className='contact-quicklinks h-12'>
            <Contact
              id='threads'
              type='action'
              name={t('threads', 'Threads')}
              icon={<ChatOutlined />}
              className='threads'
            />
          </div>
          <div className='channcels flex flex-col'>
            <div className='title flex flex-1' onClick={toggleFoldChannels}>
              <div className='icon flex items-center justify-center w-6'>
                {foldChannels ? (
                  <ChevronRightOutlined />
                ) : (
                  <ChevronDownOutlined />
                )}
              </div>
              <div className='ml-2 flex-1'>{t('channels', 'Channels')}</div>
            </div>
            <ul className='channels'>
              {channels.map(channel => {
                const visible = !foldChannels || channel.id === activeContactId
                if (!visible) {
                  return null
                }
                return (
                  <li key={channel.id}>
                    <Contact
                      id={channel.id}
                      type='channel'
                      name={channel.name}
                      icon='#'
                    />
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='directs flex flex-col'>
            <div className='title flex flex-1' onClick={toggleFoldDirects}>
              <div className='icon flex items-center justify-center w-6'>
                {foldChannels ? (
                  <ChevronRightOutlined />
                ) : (
                  <ChevronDownOutlined />
                )}
              </div>
              <div className='ml-2 flex-1'>{t('directMessage', 'Direct messages')}</div>
            </div>
            <ul className='directs'>
              {directs.map(peer => {
                const visible = !foldDirects || peer.id === activeContactId
                if (!visible) {
                  return null
                }
                return (
                  <li key={peer.id}>
                    <Contact
                      id={peer.id}
                      type='direct'
                      name={peer.name}
                      icon={
                        peer.avatar ? (
                          <Image alt='avatar' src={peer.avatar} />
                        ) : (
                          <UserOutlined />
                        )
                      }
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className='content bg-slate-100 flex-1 ml-2 text-black p-2'>
          Logined as {profile.accounts[0]}
        </div>
      </div>
    </div>
  )
}
