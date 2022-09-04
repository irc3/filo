import { FC, useMemo } from 'react'
import { XOutlined } from '@emmda-design/icons'
import { mergeClassName } from '@emmda-design/utils'

type ContactType = 'action' | 'channel' | 'direct'

interface ContactProps {
  className?: string
  active?: boolean
  name: string
  id: string
  type: ContactType
  closable?: boolean
  icon: JSX.Element | string
  onClose?: () => Promisable<void>
  onClick?: (params: { id: string; type: ContactType }) => Promisable<void>
}

const Contact: FC<ContactProps> = ({
  active,
  name,
  id,
  type,
  closable,
  icon,
  onClose,
  onClick,
  className
}) => {
  const iconCls = 'w-6 rounded flex items-center text-lg text-center px-0.5'
  const handleClick = () => {
    onClick?.({ id, type })
  }

  const parsedIcon = useMemo(() => {
    return typeof icon === 'string' ? (<div className='mx-auto'>{icon}</div>) : icon
  }, [icon])
  return (
    <div className={mergeClassName('contact flex py-2', className)}>
      <div className='content flex flex-1' onClick={handleClick}>
        <div className={`icon ${iconCls}`}>{parsedIcon}</div>
        <div className='name flex-1 ml-2'>{name}</div>
      </div>
      {closable && (
        <div className={`close ${iconCls}`}>
          <XOutlined />
        </div>
      )}
    </div>
  )
}

export default Contact
