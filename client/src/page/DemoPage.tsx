import {useContext, useEffect, useState} from "react"

import Banner from "../components/Banner"
import CardProduct from "../components/CardProduct"
import Coupon from "../components/Coupon"
import {Link} from "react-router-dom"
import {SectionContext} from "../components/SectionContext"
import {useParams} from "react-router-dom"
import {useAppDispatch} from "../features/hooks"
import {Section} from "../utils/type"
import {getOnePage} from "../features/AppSlice"

interface TypeComponent {
  banner: (item: Section) => JSX.Element
  cardProduct: (item: Section) => JSX.Element
  coupon: (item: Section) => JSX.Element
}

const typeComponent: TypeComponent = {
  banner: (item: Section) => <Banner item={item} />,
  cardProduct: (item: Section) => <CardProduct item={item} />,
  coupon: (item: Section) => <Coupon item={item} />,
}

export default function DemoPage() {
  const value = useContext(SectionContext)
  const {id = ""} = useParams()
  const dispatch = useAppDispatch()
  const {handleSavePage, sectionList} = value
  const [sectionListNew, setSectionListNew] = useState<Section[]>(sectionList)

  useEffect(() => {
    setSectionListNew(sectionList)
  }, [sectionList])

  useEffect(() => {
    const fetchSection = async () => {
      const result = await dispatch(getOnePage(id))
      if (getOnePage.fulfilled.match(result)) {
        setSectionListNew(result.payload.sections)
      }
    }
    fetchSection()
  }, [id, dispatch])

  return (
    <div>
      <div></div>
      <div className="h-[100px] flex items-center px-6 bg-white m-4 rounded-[4px] ">
        <Link
          to={`/edit/${id}`}
          className="text-white font-semibold text-lg px-5 py-3 mr-4 bg-[#ea5354] rounded-[4px]"
        >
          Quay lại chỉnh sửa
        </Link>
        <button
          onClick={() => handleSavePage(id)}
          className="text-white font-semibold text-lg px-5 py-2 bg-[#2cc670] rounded-[4px]"
        >
          Lưu lại thay đổi
        </button>
      </div>
      {sectionListNew &&
        sectionListNew.map((item, index) => {
          return (
            <div
              key={index}
              className={`${
                item.spacing &&
                Object.entries(item.spacing).reduce(
                  (acc, item: any) => acc + `${item[0]}-${item[1].value} `,
                  "",
                )
              }`}
            >
              <div className="flex w-full h-full">
                <div className="m-auto">
                  {item.type !== "" &&
                    typeComponent[item.type as keyof TypeComponent](item)}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
