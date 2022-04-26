import {useEffect, useContext} from "react"
import HeaderEdit from "../components/HeaderEdit"
import ContentEdit from "../components/ContentEdit"
import {useAppDispatch, useAppSelector} from "../features/hooks"
import {getOnePage} from "../features/AppSlice"
import {useParams} from "react-router-dom"
import {SectionContext} from "../components/SectionContext"

export default function EditPage() {
  const dispatch = useAppDispatch()
  const value = useContext(SectionContext)
  const {setPageNameValue, setPathValue, setSectionList} = value
  const page = useAppSelector((state) => state.app.page)
  const loading = useAppSelector((state) => state.app.loading)
  const {id = ""} = useParams()

  useEffect(() => {
    dispatch(getOnePage(id))
  }, [dispatch, id])

  useEffect(() => {
    if (page) {
      setPageNameValue(page.pageName)
      setPathValue(page.path)

      setSectionList(JSON.parse(JSON.stringify(page.sections)))
    }
  }, [page])

  console.log(page)

  return (
    <div className="flex">
      {loading || (
        <div className="w-[96%] mx-auto">
          <HeaderEdit />

          <ContentEdit />
        </div>
      )}
    </div>
  )
}
