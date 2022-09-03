import { QuestionMarkCircleOutlined, UserCircleOutlined } from '@emmda-design/icons'
import useTranslation from 'hooks/useTranslation'

export default function Header () {
  const { t } = useTranslation()
  return (
    <div
      className='w-full h-full flex items-center justify-between px-2'
    >
      <div className='history-toolbar w-5/12 max-w-xs'></div>
      <div className='flex flex-1 justify-between items-center h-full'>
        <div className='search-bar h-full py-2'>
          <input type="text" className='h-full px-2 w-64 focus:w-96 text-black' placeholder={t('search', 'Search')} />
        </div>
        <div className='actions h-full flex items-center justify-between w-12'>
          <div className='help w-5'>
            <QuestionMarkCircleOutlined />
          </div>
          <div className='user w-5'>
            <UserCircleOutlined />
          </div>
        </div>
      </div>
    </div>
  )
}
