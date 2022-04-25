import {useState, useEffect} from 'react'
import {IoWarningOutline} from 'react-icons/io5'
import {AiOutlineCloseCircle} from 'react-icons/ai'

interface ToastyProps {
  show: boolean
  title: string
  type: string
}

export default function Toasty({show, title, type}: ToastyProps) {
  const [showToasty, setShowToasty] = useState(show)
  const colorType: any = {
    success: '#00e676',
    warning: '#ffeb3b',
    error: '#ff5722',
    info: '#2979ff'
  }
  useEffect(() => {
    setShowToasty(show)
  }, [show])

  useEffect(() => {
    let timer: any = null

    if (showToasty) {
      timer = setTimeout(() => setShowToasty(false), 5000)
    }

    return () => clearTimeout(timer)
  }, [showToasty])

  return (
    <>
      {showToasty && (
        <div
          className={`fixed top-[40px] right-0 bg-white border-l-[4px]`}
          style={{
            borderColor: colorType[type]
          }}
        >
          <div className='flex items-center px-5 py-3 rounded-[4px] shadow-lg'>
            <div className='text-xl'>
              <IoWarningOutline />
            </div>
            <div className='mx-4 text-lg font-semibold'>
              <h3>{title}</h3>
            </div>
            <button onClick={() => setShowToasty(false)} className='text-xl'>
              <AiOutlineCloseCircle />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
