import React, {useState} from 'react'
import ModalNewPage from './ModalNewPage'

export default function NavApp() {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className='mt-10 mx-10 rounded-[4px]'>
      <div className='bg-white rounded-[5px] px-6 py-2 flex justify-between'>
        <div className='flex items-center'>
          <h3 className='font-semibold text-xl text-[#6d6a7b]'>
            Danh sách trang web
          </h3>
        </div>
        <div>
          <button
            onClick={() => setOpen(true)}
            className='px-5 py-2 text-white rounded-[4px] bg-[#7467f0]'
          >
            New Page
          </button>
          <ModalNewPage open={open} onClose={setOpen} />
        </div>
      </div>
    </div>
  )
}
