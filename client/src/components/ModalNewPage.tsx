import React, {useState} from "react"
import Modal from "./Modal"
import {createPage, getAllPage} from "../features/AppSlice"
import {useAppDispatch} from "../features/hooks"
import {v4 as uuidv4} from "uuid"
import Toasty from "./Toasty"
import {useEffect} from "react"

interface ModalNewPageProp {
  open: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalNewPage({open, onClose}: ModalNewPageProp) {
  const dispatch = useAppDispatch()
  const [pathValue, setPathValue] = useState<string>("")
  const [pageNameValue, setPageNameValue] = useState<string>("")
  const [missingPath, setMissingPath] = useState<boolean>(false)
  const [missingPageName, setMissingPageName] = useState<boolean>(false)
  const [showToasty, setShowToasty] = useState<boolean>(false)
  const [typeToasty, setTypeToasty] = useState<string>("")
  const [titleToasty, setTitleToasty] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!pageNameValue) {
      setMissingPageName(true)
      return false
    } else if (!pathValue || !pathValue.startsWith("/")) {
      setMissingPath(true)
      return false
    }
    const resultAction = await dispatch(
      createPage({
        pageName: pageNameValue,
        path: pathValue,
        status: false,
        sections: [
          {
            id: uuidv4(),
            columnActive: 1,
            spacing: {},
            type: "",
            children: [
              {
                id: uuidv4(),
                children: [
                  {
                    content: [],
                    id: uuidv4(),
                  },
                ],
              },
            ],
          },
          {
            columnActive: 1,
            id: uuidv4(),
            spacing: {},
            type: "",
            children: [
              {
                id: uuidv4(),
                children: [
                  {
                    content: [],
                    id: uuidv4(),
                  },
                ],
              },
            ],
          },
        ],
      }),
    )
    if (createPage.fulfilled.match(resultAction)) {
      onClose(false)
      setShowToasty(true)
      setTypeToasty("success")
      setTitleToasty("Create page successfully")
      setPageNameValue("")
      setPathValue("")
      dispatch(getAllPage())
    } else {
      onClose(false)
      setShowToasty(true)
      setTypeToasty("error")
      setTitleToasty("Create page failed")
    }
  }
  useEffect(() => {
    let timer: any
    if (showToasty) {
      timer = setTimeout(() => setShowToasty(false), 5000)
    }
    return () => clearTimeout(timer)
  }, [showToasty])
  return (
    <>
      <Modal open={open} onClose={onClose} title="New Page">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="text-left">
              <label className="block mb-2 text-lg font-semibold text-[#444]">
                Name Page
              </label>
              <input
                type="text"
                value={pageNameValue}
                onChange={(e) => {
                  if (missingPageName) {
                    setMissingPageName(false)
                  }
                  setPageNameValue(e.target.value)
                }}
                placeholder="Home"
                className="border outline-none rounded-[4px] w-full text-[#444] px-4 py-2"
              />

              <p
                className={`text-[#f44336] mt-1 text-sm font-semibold ${
                  !missingPageName ? "hidden" : ""
                }`}
              >
                Please enter Page Name
              </p>
            </div>
            <div className="text-left mt-4">
              <label className="block mb-2 text-lg font-semibold text-[#444]">
                Path Page
              </label>
              <input
                type="text"
                value={pathValue}
                onChange={(e) => {
                  if (missingPath) {
                    setMissingPath(false)
                  }
                  setPathValue(e.target.value)
                }}
                placeholder="/home"
                className="border outline-none rounded-[4px] w-full text-[#444] px-4 py-2"
              />
              <p
                className={`text-[#f44336] mt-1 text-sm font-semibold ${
                  !missingPath ? "hidden" : ""
                }`}
              >
                Please enter Path
              </p>
            </div>
            <button className="rounded-[4px] text-white font-semibold mt-4 px-4 py-2 bg-[#ff9100]">
              Create Page
            </button>
          </form>
        </div>
      </Modal>
      <Toasty title={titleToasty} show={showToasty} type={typeToasty} />
    </>
  )
}
