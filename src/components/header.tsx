import {
  XOutlined,
  MinusOutlined,
  ArrowsExpandOutlined
} from '@emmda-design/icons'
import useTauriWindow from 'hooks/useTauriWindow'

export default function Header () {
  const iconCls =
    'w-4 h-4 rounded-full flex items-center justify-center space-x-2 group'
  const buttonCls = 'w-3 h-3 hidden group-hover:block'

  const { tauriWindow } = useTauriWindow()
  return (
    <div
      className='w-full h-full flex items-center justify-between px-2'
      data-tauri-drag-region
    >
      <div className='controls flex w-14 justify-between'>
        <div
          className={`${iconCls} bg-orange-600`}
          onClick={() => tauriWindow?.close()}
        >
          <XOutlined className={buttonCls} />
        </div>
        <div
          className={`${iconCls} bg-yellow-600`}
          onClick={() => tauriWindow?.minimize()}
        >
          <MinusOutlined className={buttonCls} />
        </div>
        <div
          className={`${iconCls} bg-green-600`}
          onClick={() => tauriWindow?.toggleMaximize()}
        >
          <ArrowsExpandOutlined className={buttonCls} />
        </div>
      </div>
      <div className='menu'>menu</div>
    </div>
  )
}
