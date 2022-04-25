import React, {useState, useContext} from "react"
import {SectionContext} from "./SectionContext"
import {SectionChildrenItem} from "../utils/type"
interface FormCouponProp {
  idParent: string
  idChildren: string
  idItem: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  item: SectionChildrenItem
}

export default function FormCoupon({
  idParent,
  idChildren,
  idItem,
  item,
  setOpen,
}: FormCouponProp) {
  const value = useContext(SectionContext)
  const {sectionList, setSectionList, setPreventDragSection} = value
  const [content, setContent] = useState<string[]>(item.content || [])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let sectionListNew = [...sectionList]

    sectionListNew = sectionListNew.map((item) => {
      if (item.id === idParent) {
        const itemNew = Object.assign({}, item)
        itemNew.children = itemNew.children.map((item) => {
          if (item.id === idChildren) {
            const itemChildrenNew = {...item}
            itemChildrenNew.children = itemChildrenNew.children.map((item) => {
              if (item.id === idItem) {
                let itemComponentNew = {...item}
                itemComponentNew.content = content
                return itemComponentNew
              }
              return item
            })
            return itemChildrenNew
          }
          return item
        })
        return itemNew
      }
      return item
    })

    setContent([])
    setOpen(false)
    setPreventDragSection(false)
    setSectionList([...sectionListNew])
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-center">
        <div className="mt-4">
          <input
            value={content[0]}
            onChange={(e) => {
              content[0] = e.target.value
              setContent([...content])
            }}
            className="outline-none border ml-4 rounded-[4px] w-full px-4 py-1"
            type="text"
            placeholder="Src Image"
          />
        </div>
        <div className="mt-4">
          <input
            value={content[1]}
            onChange={(e) => {
              content[1] = e.target.value
              setContent([...content])
            }}
            className="outline-none border ml-4 rounded-[4px] w-full px-4 py-1"
            type="text"
            placeholder="Alt Image"
          />
        </div>
        <button className="mt-5 bg-gray-400 text-lg rounded-[4px] text-white font-semibold px-4 py-2">
          Save
        </button>
      </form>
    </div>
  )
}
