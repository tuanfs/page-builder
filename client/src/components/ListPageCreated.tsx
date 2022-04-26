import React, {useState, useEffect} from "react"
import {MdModeEdit} from "react-icons/md"
import {BsFillTrashFill} from "react-icons/bs"
import Toasty from "./Toasty"
import {useAppDispatch, useAppSelector} from "../features/hooks"
import {getAllPage, deletePage} from "../features/AppSlice"
import {Section} from "../utils/type"
import {Link} from "react-router-dom"

interface PageItem {
  id: string
  _id: string
  path: string
  pageName: string
  status: boolean
  sections: Section[]
}

export default function ListPageCreated() {
  const [status, setStatus] = useState(false)
  const loading = useAppSelector((state) => state.app.loading)
  const pageList = useAppSelector((state) => state.app.pageList)
  const dispatch = useAppDispatch()
  const [showToasty, setShowToasty] = useState<boolean>(false)
  const [tableElement, setTableElement] = useState<HTMLElement>()
  const [typeToasty, setTypeToasty] = useState<string>("")
  const [titleToasty, setTitleToasty] = useState<string>("")
  useEffect(() => {
    const fethPageList = () => {
      dispatch(getAllPage())
    }
    fethPageList()
  }, [dispatch])

  const handleDeletePage = async (id: string) => {
    const result = await dispatch(deletePage(id))
    if (deletePage.fulfilled.match(result)) {
      setTypeToasty("success")
      setTitleToasty("Deleted page successfully")
      setShowToasty(true)
      dispatch(getAllPage())
    } else {
      setTypeToasty("error")
      setShowToasty(true)
      setTitleToasty("Deleted page failed")
    }
  }
  useEffect(() => {
    let timer: any
    if (showToasty) {
      timer = setTimeout(() => setShowToasty(false), 5000)
    }
    return () => clearTimeout(timer)
  }, [showToasty])

  useEffect(() => {
    if (loading) {
      let html: any
      html = <div>Loading</div>
      setTableElement(html)
    } else if (!loading && pageList.length === 0) {
      let html: any
      html = <div>Page list empty</div>
      setTableElement(html)
    } else if (pageList.length > 0) {
      let html: any
      html = (
        <table className="table-auto w-full">
          <thead>
            <tr className="grid grid-cols-12 border-b-[1px] py-3 border-gray-400">
              <th className="col-span-3">Path</th>
              <th className="col-span-2">Tên trang</th>
              <th className="col-span-3">Link demo trên web</th>
              <th className="col-span-2">Trạng thái</th>
              <th className="col-span-2">Thực hiện</th>
            </tr>
          </thead>
          <tbody>
            {pageList.map((item: PageItem, index: number) => (
              <tr
                key={index}
                className="grid grid-cols-12 px-4 py-5 border-b-[1px] border-gray-400"
              >
                <td className="col-span-3"> {item.path}</td>
                <td className="col-span-2">{item.pageName}</td>
                <td className="col-span-3">
                  <a
                    href={`https://test-remote.netlify.app${item.path}`}
                    className=""
                  >{`https://test-remote.netlify.app${item.path}`}</a>
                </td>
                <td className="col-span-2 text-center">
                  <div className="rounded-[10px] inline-block cursor-pointer w-[50px] relative h-[20px] bg-black">
                    <div
                      className={`absolute transition-all duration-75 ease-in bg-[#7566f0] rounded-full h-full w-[20px] ${
                        item.status ? "left-[60%]" : "left-[0%]"
                      }`}
                    ></div>
                  </div>
                </td>
                <td className="col-span-2 flex items-center justify-center">
                  <Link
                    to={`/edit/${item._id}`}
                    className="mr-4 font-semibold text-lg"
                  >
                    <MdModeEdit />
                  </Link>
                  <button
                    onClick={() => handleDeletePage(item._id)}
                    className="text-red-500 font-semibold text-lg"
                  >
                    <BsFillTrashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
      setTableElement(html)
    }
  }, [loading, pageList])

  return (
    <div className="mx-10 my-6 bg-white">
      <>
        <Toasty show={showToasty} title={titleToasty} type={typeToasty} />
        {tableElement}
      </>
    </div>
  )
}
