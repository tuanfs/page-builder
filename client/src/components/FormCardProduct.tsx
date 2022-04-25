import React, {useState, useContext, useEffect} from "react"
import {SectionContext} from "./SectionContext"
import {updateCardProduct} from "../features/AppSlice"
import {useAppDispatch} from "../features/hooks"
import {useParams} from "react-router-dom"
import {SectionChildrenItem} from "../utils/type"
interface FormCardProductProp {
  idParent: string
  idChildren: string
  idItem: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  item: SectionChildrenItem
}

export default function FormCardProduct({
  idParent,
  idChildren,
  idItem,
  item,
  setOpen,
}: FormCardProductProp) {
  const dispatch = useAppDispatch()
  const {id = ""} = useParams()
  const value = useContext(SectionContext)
  const {sectionList, setSectionList, setPreventDragSection} = value
  const [priceLt, setPriceLt] = useState<number>()
  const [priceGt, setPriceGt] = useState<number>()
  const [itemShow, setItemShow] = useState<number>()

  useEffect(() => {
    if (item.content && item.content.length > 0) {
      setPriceLt(Number(item.content[1]))
      setPriceGt(Number(item.content[0]))
      setItemShow(Number(item.content[2]))
    }
  }, [item.content])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await dispatch(
      updateCardProduct({
        id,
        formValue: {
          idParent,
          idChildren,
          idItem,
          priceLt: Number(priceLt),
          priceGt: Number(priceGt),
          itemShow: Number(itemShow),
        },
      }),
    )

    if (updateCardProduct.fulfilled.match(result)) {
      let sectionListNew = [...sectionList]

      sectionListNew = sectionListNew.map((item) => {
        if (item.id === idParent) {
          const itemNew = Object.assign({}, item)
          itemNew.children = itemNew.children.map((item) => {
            if (item.id === idChildren) {
              const itemChildrenNew = {...item}
              itemChildrenNew.children = itemChildrenNew.children.map(
                (item) => {
                  if (item.id === idItem) {
                    let itemNew = {...item}

                    itemNew.content = result.payload.content
                    return itemNew
                  }
                  return item
                },
              )
              return itemChildrenNew
            }
            return item
          })
          return itemNew
        }
        return item
      })
      setOpen(false)
      setPreventDragSection(false)
      setSectionList([...sectionListNew])
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-center">
        <div className="mt-4">
          <input
            value={priceGt}
            className="outline-none border ml-4 rounded-[4px] w-full px-4 py-1"
            onChange={(e) => {
              setPriceGt(Number(e.target.value))
            }}
            type="text"
            placeholder="Greater than price : (should enter: 10000)"
          />
        </div>
        <div className="mt-4">
          <input
            value={priceLt}
            className="outline-none border ml-4 rounded-[4px] w-full px-4 py-1"
            onChange={(e) => {
              setPriceLt(Number(e.target.value))
            }}
            type="text"
            placeholder="Less than price : (should enter: 100000)"
          />
        </div>
        <div className="mt-4">
          <input
            value={itemShow}
            className="outline-none border ml-4 rounded-[4px] w-full px-4 py-1"
            onChange={(e) => {
              setItemShow(Number(e.target.value))
            }}
            type="text"
            placeholder="Item show"
          />
        </div>
        <button className="bg-gray-400 mt-4 rounded-[4px] text-white text-lg font-semibold px-4 py-2">
          Save
        </button>
      </form>
    </div>
  )
}
