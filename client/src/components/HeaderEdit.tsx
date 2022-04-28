import {useContext} from "react"
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import {SectionContext} from "./SectionContext"
import {useNavigate} from "react-router-dom"

export default function HeaderEdit() {
  const {id = ""} = useParams()
  const value = useContext(SectionContext)
  const {
    pathValue,
    pageNameValue,
    setPageNameValue,
    setPathValue,
    handleSavePage,
    setLoadingDemoPage,
  } = value
  const navigate = useNavigate()

  return (
    <div>
      <div className="my-10 h-[100px]  bg-white rounded-[4px] text-left p-4">
        <button
          onClick={() => {
            handleSavePage(id)
            navigate("/")
          }}
          className="text-white font-semibold text-lg px-5 py-2 bg-[#ea5354] rounded-[4px]"
        >
          Save edit
        </button>
        <Link
          to={`/demo/${id}`}
          onClick={() => {
            handleSavePage(id)
            setLoadingDemoPage(false)
          }}
          className="text-white font-semibold text-lg px-5 py-3 ml-5 rounded-[4px] bg-[#2cc670]"
        >
          Preview
        </Link>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-6">
          <form className="text-left">
            <div>
              <label className="text-lg font-semibold text-[#444] ml-3">
                Page Name
              </label>
              <input
                type="text"
                value={pageNameValue}
                onChange={(e) => setPageNameValue(e.target.value)}
                className="outline-none w-full px-4 py-2 border"
                placeholder="Tên trang"
              />
            </div>
            <div className="mt-4">
              <label className="text-lg font-semibold text-[#444] ml-3">
                Path
              </label>
              <input
                type="text"
                value={pathValue}
                onChange={(e) => setPathValue(e.target.value)}
                className="outline-none w-full px-4 py-2 border"
                placeholder="Đường dẫn"
              />
            </div>
          </form>
        </div>
        <div className="col-span-6">
          <div className="bg-white w-full h-[200px] px-4">
            <h3 className="font-semibold block py-4 text-[#444] text-lg">
              Information class
            </h3>
            <div className="flex">
              <div className="bg-[#333] mr-4 rounded-[4px] text-white font-semibold text-lg px-4 py-2">
                <span>mt-5</span>
              </div>
              <div className="bg-[#333] mr-4 rounded-[4px] text-white font-semibold text-lg px-4 py-2">
                <span>mt-5</span>
              </div>
              <div className="bg-[#333] mr-4 rounded-[4px] text-white font-semibold text-lg px-4 py-2">
                <span>mt-5</span>
              </div>
              <div className="bg-[#333] mr-4 rounded-[4px] text-white font-semibold text-lg px-4 py-2">
                <span>mt-5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
