import {createContext, useState, ReactNode} from "react"
import {Section} from "../utils/type"
import {v4 as uuidv4} from "uuid"
import {useAppDispatch} from "../features/hooks"
import {updatePage, getOnePage} from "../features/AppSlice"

interface CreateContext {
  sectionList: Section[]
  setSectionList: (sectionList: Section[]) => void
  handleSavePage: (id: string) => void
  pathValue: string
  pageNameValue: string
  preventDragSection: boolean
  loadingDemoPage: boolean
  setPreventDragSection: React.Dispatch<React.SetStateAction<boolean>>
  setLoadingDemoPage: React.Dispatch<React.SetStateAction<boolean>>
  setPageNameValue: React.Dispatch<React.SetStateAction<string>>
  setPathValue: React.Dispatch<React.SetStateAction<string>>
}

const defaultValue = {
  sectionList: [
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
              id: uuidv4(),
              content: [""],
            },
          ],
        },
      ],
    },
  ],
  setSectionList: (sectionList: Section[]) => {},
  handleSavePage: (id: string) => {},
  pageNameValue: "",
  setPageNameValue: () => {},
  pathValue: "",
  setPathValue: () => {},
  preventDragSection: false,
  preventDragChildren: false,
  loadingDemoPage: true,
  setLoadingDemoPage: () => {},
  setPreventDragSection: () => {},
  setPreventDragChildren: () => {},
}

interface SectionContextProviderProp {
  children: ReactNode
}

export const SectionContext = createContext<CreateContext>(defaultValue)

function SectionContextProvider({children}: SectionContextProviderProp) {
  const dispatch = useAppDispatch()
  const [sectionList, setSectionList] = useState<Section[]>([])
  const [pathValue, setPathValue] = useState<string>("")
  const [pageNameValue, setPageNameValue] = useState<string>("")
  const [preventDragSection, setPreventDragSection] = useState(false)
  const [loadingDemoPage, setLoadingDemoPage] = useState(true)

  const handleSetSectionList = (sectionList: Section[]) => {
    setSectionList(sectionList)
  }

  const handleSavePage = async (id: string) => {
    const newSection = sectionList.map((item: any) => {
      const newItem = Object.assign({}, item)
      newItem.children = item.children.map((item: any) => {
        const newItem = Object.assign({}, item)
        newItem.children = newItem.children.filter((item: any) => {
          return item.content && item.content.length > 0
        })

        return newItem
      })
      return newItem
    })

    const result = await dispatch(
      updatePage({
        id: id,
        formValue: {
          path: pathValue,
          pageName: pageNameValue,
          sections: newSection,
          status: false,
        },
      }),
    )
    if (updatePage.fulfilled.match(result)) {
      dispatch(getOnePage(id))
    }
  }

  const value = {
    sectionList,
    setSectionList: handleSetSectionList,
    handleSavePage,
    pageNameValue,
    setPageNameValue,
    pathValue,
    setPathValue,
    preventDragSection,
    setPreventDragSection,
    loadingDemoPage,
    setLoadingDemoPage,
  }
  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  )
}

export default SectionContextProvider
