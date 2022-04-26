import React, {useRef, useState, useEffect, useContext} from "react"
import {Container, Draggable} from "react-smooth-dnd"
import {SectionChildren, DropResult, SectionChildrenItem} from "../utils/type"
import {applyDrag} from "../utils/applyDrag"
import {BsFillTrashFill, BsPlusLg} from "react-icons/bs"
import {AiFillEdit} from "react-icons/ai"
import {RiDragMove2Fill} from "react-icons/ri"
import Modal from "./Modal"
import {v4 as uuidv4} from "uuid"
import {SectionContext} from "./SectionContext"
import FormCoupon from "./FormCoupon"
import FormCardProduct from "./FormCardProduct"
import FormBanner from "./FormBanner"

interface SectionItemProp {
  items: SectionChildren
  idParent: string
  columnActive: number
}

interface ParamsSection {
  idParent: string
  idChildren: string
  idItem: string
  item: SectionChildrenItem
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface SectionType {
  banner: ({
    idParent,
    idChildren,
    idItem,
    item,
    setOpen,
  }: ParamsSection) => JSX.Element
  cardProduct: ({
    idParent,
    idChildren,
    idItem,
    item,
    setOpen,
  }: ParamsSection) => JSX.Element
  coupon: ({
    idParent,
    idChildren,
    idItem,
    item,
    setOpen,
  }: ParamsSection) => JSX.Element
}

const sectionType: SectionType = {
  banner: ({idParent, idChildren, idItem, setOpen, item}) => (
    <FormBanner
      idParent={idParent}
      idItem={idItem}
      idChildren={idChildren}
      setOpen={setOpen}
      item={item}
    />
  ),
  cardProduct: ({idParent, idChildren, idItem, setOpen, item}) => (
    <FormCardProduct
      idParent={idParent}
      idItem={idItem}
      idChildren={idChildren}
      setOpen={setOpen}
      item={item}
    />
  ),
  coupon: ({idParent, idChildren, idItem, setOpen, item}) => (
    <FormCoupon
      idParent={idParent}
      idItem={idItem}
      idChildren={idChildren}
      setOpen={setOpen}
      item={item}
    />
  ),
}

export default function SectionItem({items, idParent}: SectionItemProp) {
  const value = useContext(SectionContext)
  const {
    sectionList,
    setSectionList,
    setPreventDragSection,
    preventDragSection,
  } = value
  const [open, setOpen] = useState<boolean>(false)
  const wrapContainerRef = useRef<HTMLDivElement>(null)
  const getPayload = (index: number) => {
    return items.children[index]
  }

  const handleDrop = async (columnId: string, e: DropResult) => {
    if (e.removedIndex !== null || e.addedIndex !== null) {
      let scene = [...sectionList]

      const columnParent = scene.filter((p: any) => p.id === idParent)[0]

      const column = columnParent.children.filter(
        (p: any) => p.id === columnId,
      )[0]

      const columnIndex = columnParent.children.indexOf(column)

      const newColumn = Object.assign({}, column)

      newColumn.children = applyDrag(newColumn.children, e)

      columnParent.children.splice(columnIndex, 1, newColumn)

      scene = scene.map((item: any) => {
        if (item.id === idParent) {
          return columnParent
        } else {
          return item
        }
      })

      setSectionList(scene)
    }
  }

  const handleRemoveColumn = () => {
    let sectionListNew = [...sectionList]

    sectionListNew = sectionListNew.map((item) => {
      if (item.id === idParent) {
        item.children = item.children.filter((item) => {
          return item.id !== items.id
        })
      }
      item.columnActive = item.children.length
      return item
    })

    setSectionList(sectionListNew)
  }

  const handleRemoveItem = (id: string) => {
    let sectionListNew = [...sectionList]

    sectionListNew = sectionListNew.map((item) => {
      if (item.id === idParent) {
        const itemNew = Object.assign({}, item)
        itemNew.children = itemNew.children.map((item) => {
          if (item.id === items.id) {
            const itemNew = Object.assign({}, item)

            itemNew.children = itemNew.children.filter((item) => item.id !== id)
            return itemNew
          }
          return item
        })
        return itemNew
      }
      return item
    })

    setSectionList([...sectionListNew])
  }

  const handleClose = () => {
    setPreventDragSection(false)
    setOpen(false)
  }
  const handleAddItem = () => {
    let sectionListNew = [...sectionList]
    sectionListNew = sectionListNew.map((item) => {
      if (item.id === idParent) {
        const itemNew = Object.assign({}, item)
        itemNew.children = item.children.map((item) => {
          if (item.id === items.id) {
            const itemNew = Object.assign({}, item)
            itemNew.children = [
              ...item.children,
              {
                id: uuidv4(),
                content: [],
              },
            ]
            return itemNew
          }
          return item
        })
        return itemNew
      }
      return item
    })
    setSectionList([...sectionListNew])
  }

  return (
    <>
      <div className="m-1">
        <div className="flex">
          <div className="relative group">
            <button
              onClick={() => handleAddItem()}
              className="bg-[#ccc] cursor-pointer p-3 inline-block border-r-[1px] border-[#a4a4a4]"
            >
              <BsPlusLg />
            </button>
            <div className="bg-[#625bcb] -top-[170%] hidden left-1/2 -translate-x-1/2 absolute group-hover:inline-block py-2 px-4 text-white font-semibold">
              <span>Add item</span>
            </div>
          </div>
          <button className="bg-[#ccc] cursor-pointer p-3 inline-block border-r-[1px] border-[#a4a4a4]">
            <RiDragMove2Fill />
          </button>
          <button
            onClick={handleRemoveColumn}
            className="bg-[#ccc] cursor-pointer p-3 inline-block"
          >
            <BsFillTrashFill />
          </button>
        </div>
        <div className="flex mx-1 z-[-1]" ref={wrapContainerRef}>
          <Container
            orientation="vertical"
            getChildPayload={getPayload}
            dragHandleSelector={`${preventDragSection ? ".prevent" : ""}`}
            onDrop={(e) => handleDrop(items.id, e)}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "drop-preview",
            }}
            render={(ref) => {
              return (
                <ul ref={ref}>
                  {items.children.map((item, index) => {
                    return (
                      <Draggable
                        key={index}
                        render={() => (
                          <div
                            className={`relative bg-white border border-[#333] shadow-lg w-full my-1 min-h-[100px] p-2`}
                          >
                            <div className="text-2xl cursor-pointer">
                              <Modal
                                title="Enter data"
                                open={open}
                                handleClose={handleClose}
                                onClose={setOpen}
                              >
                                <div className="">
                                  {sectionList.find(
                                    (item) =>
                                      item.id === idParent && item.type !== "",
                                  ) &&
                                    sectionType[
                                      sectionList.find(
                                        (item) =>
                                          item.id === idParent &&
                                          item.type !== "",
                                      )?.type as keyof SectionType
                                    ]({
                                      idParent,
                                      idChildren: items.id,
                                      idItem: item.id,
                                      item,
                                      setOpen,
                                    })}
                                </div>
                              </Modal>
                            </div>
                            <div className="">
                              <div className="flex items-center z-[2] absolute">
                                <button
                                  className={`bg-[#ccc] mr-2 p-2 text-xl ${
                                    item.content && item.content.length > 0
                                      ? "hidden"
                                      : "inline-block"
                                  }`}
                                  onClick={() => {
                                    setOpen(true)
                                    setPreventDragSection(true)
                                  }}
                                >
                                  <BsPlusLg />
                                </button>
                                <button
                                  onClick={() => {
                                    setOpen(true)
                                    setPreventDragSection(true)
                                  }}
                                  className={`bg-[#ccc] mr-2 p-2 text-xl ${
                                    item.content && item.content.length > 0
                                      ? "inline-block"
                                      : "hidden"
                                  }`}
                                >
                                  <AiFillEdit />
                                </button>
                                <button
                                  onClick={() => handleRemoveItem(item.id)}
                                  className={`bg-[#ccc] p-2 inline-block text-xl ${
                                    item && item.content === [] && "hidden"
                                  }`}
                                >
                                  <BsFillTrashFill />
                                </button>
                              </div>
                              <div
                                className={`${
                                  item.content &&
                                  item.content.length === 0 &&
                                  "hidden"
                                } absolute left-[100px]`}
                              >
                                {item.content &&
                                item.content.length > 0 &&
                                item.content[0]
                                  .toString()
                                  .startsWith("http") ? (
                                  <div className="">
                                    <h3>
                                      Src: {item.content && item.content[0]}
                                    </h3>
                                    <h3>
                                      Alt: {item.content && item.content[1]}
                                    </h3>
                                  </div>
                                ) : (
                                  <div
                                    className={`${
                                      item.content && item.content.length > 0
                                        ? "block"
                                        : "hidden"
                                    }`}
                                  >
                                    <h3>
                                      Greater than:{" "}
                                      {item.content && item.content[0]}
                                    </h3>
                                    <h3>
                                      Less than:{" "}
                                      {item.content && item.content[1]}
                                    </h3>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      ></Draggable>
                    )
                  })}
                </ul>
              )
            }}
          ></Container>
        </div>
      </div>
    </>
  )
}
