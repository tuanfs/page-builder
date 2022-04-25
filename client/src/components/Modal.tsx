import React, {ReactNode, useRef} from "react"
import {useEffect} from "react"
import {MdClose} from "react-icons/md"

interface ModalProp {
  children: ReactNode
  open: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  handleClose?: () => void
}

export default function Modal({
  children,
  open,
  onClose,
  title,
  handleClose,
}: ModalProp) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: any) => {
      if (overlayRef.current) {
        if (open) {
          if (!overlayRef.current.contains(e.target)) {
            onClose(false)
            if (typeof handleClose === "function") {
              handleClose()
            }
          }
        }
      }
    }
    window.addEventListener("mousedown", handleClick)
    return () => window.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div
      className={`fixed top-0 z-[32] h-screen w-screen right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.08)] ${
        open ? "flex animate-fadeIn opacity-100" : "hidden"
      }`}
    >
      <div
        ref={overlayRef}
        className="relative top-[100px] mx-auto max-h-[370px] w-[600px] bg-white rounded-[10px] p-5"
      >
        <div className="text-right">
          <button
            onClick={() => {
              if (typeof handleClose === "function") {
                handleClose()
              }
              onClose(false)
            }}
            className="text-2xl p-2"
          >
            <MdClose />
          </button>
        </div>
        <div>
          <h3 className="text-[#333] font-semibold text-lg">{title}</h3>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
