import {useEffect, useState, useRef, useContext} from "react"
import {BsLayoutThreeColumns, BsFillTrashFill} from "react-icons/bs"
import {AiFillEdit} from "react-icons/ai"
import {Draggable, Container} from "react-smooth-dnd"
import {Section, DropResult} from "../utils/type"
import SectionItem from "./SectionItem"
import {applyDrag} from "../utils/applyDrag"
import Modal from "./Modal"
import {HiOutlineChevronDown} from "react-icons/hi"
import {AiOutlineClose, AiOutlineDrag} from "react-icons/ai"
import {RiCloseFill} from "react-icons/ri"
import {generator} from "../utils/generator"
import {SectionContext} from "./SectionContext"

interface SectionEditProp {
  items: Section
}

interface ClassName {
  className: string
  title: string
}

interface MarginValue {
  className: ClassName[]
  value: number[]
}
const marginValue: MarginValue = {
  className: [
    {
      className: "mt",
      title: "margin-top",
    },
    {
      className: "ml",
      title: "margin-left",
    },
    {
      className: "mb",
      title: "margin-bottom",
    },
    {
      className: "mr",
      title: "margin-right",
    },
    {
      className: "pt",
      title: "padding-left",
    },
    {
      className: "pb",
      title: "padding-bottom",
    },
    {
      className: "pr",
      title: "padding-right",
    },
    {
      className: "pl",
      title: "padding-left",
    },
  ],
  value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 16, 20],
}

export default function SectionEdit({items}: SectionEditProp) {
  const value = useContext(SectionContext)

  const {
    sectionList,
    setSectionList,
    preventDragSection,
    setPreventDragSection,
  } = value

  const [showOptionColumn, setShowOptionColumn] = useState(false)
  const [space, setSpace] = useState({})
  const [showDropdown, setShowDropdown] = useState(false)
  const [editId, setEditId] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLDivElement>(null)

  const getPayload = (index: number) => {
    return items.children[index]
  }

  const handleSpace = (
    e: any,
    className: string,
    value: number,
    title: string,
  ) => {
    if (e.currentTarget) {
      setSpace({...space, [className]: {value, title}})
    }
  }

  const handleRemoveItem = (title: string) => {
    Object.values(space).forEach((item: any) => {
      if (item.title === title) {
        item.value = 0
        item.title = ""
      }
    })
    setSpace({...space})
  }

  const handleCloseModal = () => {
    let sectionListNew = [...sectionList]

    sectionListNew = sectionListNew.map((item) => {
      if (item.id === items.id) {
        const itemNew = {...item}
        itemNew.spacing = {...space}
        return itemNew
      }
      return item
    })

    setEditId("")
    setSectionList([...sectionListNew])
    setShowDropdown(false)
    setPreventDragSection(false)
  }

  const handleActiveColumn = (e: any) => {
    let sectionListNew = JSON.parse(JSON.stringify(sectionList))

    sectionListNew = sectionListNew.map((item: any) => {
      if (item.id === items.id) {
        item.columnActive = Number(e.currentTarget.dataset.id)
        return item
      }
      return item
    })
    setSectionList([...sectionListNew])
  }

  const handleRemoveSection = (id: string) => {
    let sectionListNew = [...sectionList]
    sectionListNew = sectionListNew.filter((item) => item.id !== id)
    setSectionList([...sectionListNew])
  }
  const handleSelectTypeSection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    let sectionListNew = [...sectionList]
    sectionListNew = sectionListNew.map((item) => {
      if (item.id === items.id) {
        const itemNew = Object.assign({}, item)

        itemNew.type = e.currentTarget.dataset.type || ""
        return itemNew
      }
      return item
    })
    setSectionList([...sectionListNew])
  }

  useEffect(() => {
    const handleClick = (e: any) => {
      if (inputRef && inputRef.current) {
        if (showDropdown) {
          if (!inputRef.current.contains(e.target)) {
            setShowDropdown(false)
          }
        }
      }
    }
    window.addEventListener("mousedown", handleClick)
    return () => window.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => {
    if (items.spacing && Object.values(items.spacing).length > 0) {
      setSpace(items.spacing)
    }
  }, [items])

  useEffect(() => {
    let sectionListNew = JSON.parse(JSON.stringify(sectionList))
    sectionListNew = sectionListNew.map((item: any) => {
      if (item.id === items.id) {
        if (item.children.length < items.columnActive) {
          item.children = [
            ...item.children,
            ...generator(items.columnActive - items.children.length),
          ]
          return item
        }
        return item
      }
      return item
    })

    setSectionList(sectionListNew)
  }, [items.columnActive])

  const handleDrop = (columnId: string, e: DropResult) => {
    if (e.removedIndex !== null || e.addedIndex !== null) {
      const scene = [...sectionList]
      const column = scene.filter((p) => p.id === columnId)[0]
      const columnIndex = scene.indexOf(column)

      const newColumn = Object.assign({}, column)
      newColumn.children = applyDrag(newColumn.children, e)
      scene.splice(columnIndex, 1, newColumn)
      setSectionList([...scene])
    }
  }

  return (
    <div>
      <div className="mt-2 relative bg-white rounded-[4px] px-5 py-6 text-left">
        <div className="flex justify-between items-center">
          <div
            className={`bg-gray-400 ${
              items.type === "" ? "hidden" : "inline-flex"
            }`}
          >
            <div className="flex justify-center items-center text-2xl text-[#444] px-4 py-2">
              <button>
                <AiOutlineDrag />
              </button>
            </div>
            <div
              className={`${
                items.type === "coupon" ? "flex" : "hidden"
              } relative justify-center items-center text-2xl text-[#444] px-4 py-2`}
            >
              <button onClick={() => setShowOptionColumn(!showOptionColumn)}>
                <BsLayoutThreeColumns />
              </button>
              <div
                className={`absolute left-0 -top-full ${
                  showOptionColumn ? "flex" : "hidden"
                }`}
              >
                <button
                  onClick={(e) => handleActiveColumn(e)}
                  data-id="1"
                  className="px-4 py-1 border bg-[#333] text-white"
                >
                  1
                </button>
                <button
                  onClick={(e) => handleActiveColumn(e)}
                  data-id="2"
                  className="px-4 py-1 border bg-[#333] text-white"
                >
                  2
                </button>
                <button
                  onClick={(e) => handleActiveColumn(e)}
                  data-id="3"
                  className="px-4 py-1 border bg-[#333] text-white"
                >
                  3
                </button>
                <button
                  onClick={(e) => handleActiveColumn(e)}
                  data-id="4"
                  className="px-4 py-1 border bg-[#333] text-white"
                >
                  4
                </button>
                <button
                  onClick={(e) => handleActiveColumn(e)}
                  data-id="5"
                  className="px-4 py-1 border bg-[#333] text-white"
                >
                  5
                </button>
                <button
                  onClick={(e) => handleActiveColumn(e)}
                  data-id="6"
                  className="px-4 py-1 border bg-[#333] text-white"
                >
                  6
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center text-2xl text-[#444] px-4 py-2">
              <button
                onClick={() => {
                  setPreventDragSection(true)
                  setOpen(true)
                }}
                data-action="open"
              >
                <AiFillEdit />
              </button>
            </div>
            <div className="flex justify-center items-center text-2xl text-red-600 px-4 py-2">
              <button onClick={() => handleRemoveSection(items.id)}>
                <BsFillTrashFill />
              </button>
            </div>
          </div>
          <div
            className={`${items.type !== "" ? "hidden" : "flex items-center"}`}
          >
            <h3 className="text-gray-500 font-semibold text-xl">
              Click to select type section
            </h3>
            <button
              onClick={(e) => handleSelectTypeSection(e)}
              data-type="banner"
              className="px-4 py-2 ml-5 bg-slate-400 rounded-[4px] text-white font-semibold"
            >
              Banner
            </button>
            <button
              onClick={(e) => handleSelectTypeSection(e)}
              data-type="coupon"
              className="px-4 py-2 ml-5 bg-slate-400 rounded-[4px] text-white font-semibold"
            >
              Coupon
            </button>
            <button
              onClick={(e) => handleSelectTypeSection(e)}
              data-type="cardProduct"
              className="px-4 py-2 ml-5 bg-slate-400 rounded-[4px] text-white font-semibold"
            >
              Card product
            </button>
          </div>
          <div>
            <h3 className="text-gray-500 font-semibold text-3xl">
              {items.type}
            </h3>
          </div>
        </div>
        <div className="flex w-full">
          <Container
            orientation="horizontal"
            // groupName="cols"
            behaviour="move"
            dragHandleSelector={`${preventDragSection ? ".prevent" : ""}`}
            getChildPayload={getPayload}
            onDrop={(e) => handleDrop(items.id, e)}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "drop-preview",
            }}
          >
            {items.children.map((item, index) => {
              return (
                <Draggable key={index}>
                  <SectionItem
                    idParent={items.id}
                    items={item}
                    columnActive={items.columnActive}
                  />
                </Draggable>
              )
            })}
          </Container>
        </div>
      </div>
      <Modal
        open={open}
        onClose={setOpen}
        handleClose={handleCloseModal}
        title="Add class name"
      >
        <div>
          <div
            className="border-[2px] w-full flex items-center relative"
            ref={inputRef}
          >
            <div className="flex-1 flex justify-between items-center">
              <div
                className=" flex flex-col justify-start w-[260px] h-full outline-none"
                contentEditable={true}
                onFocus={() => setShowDropdown(true)}
                suppressContentEditableWarning={true}
              >
                {Object.values(space).map((item: any, index: number) => {
                  if (item.title !== "") {
                    return (
                      <p
                        key={index}
                        contentEditable={false}
                        suppressContentEditableWarning={true}
                        className="my-1 text-left bg-[#ccc] flex justify-between rounded-[2px] ml-2 items-center px-2 w-[90%] cursor-pointer "
                      >
                        {`${item.title} : ${item.value * 4}px`}
                        <span
                          onClick={() => handleRemoveItem(item.title)}
                          className="ml-4 rounded-full border"
                        >
                          <RiCloseFill />
                        </span>
                      </p>
                    )
                  }
                })}
              </div>
              <button onClick={() => setSpace({})} className="p-2">
                <AiOutlineClose />
              </button>
            </div>
            <div>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center text-2xl border-l-[2px] py-1 px-3"
              >
                <HiOutlineChevronDown />
              </button>
            </div>
            <div
              className={`bg-white border border-[#ccc] rounded-[5px] w-full absolute h-[300px] top-[105%] overflow-y-scroll ${
                showDropdown ? "" : "hidden"
              }`}
            >
              {marginValue.className.reduce((total: any, itemClass) => {
                return [
                  ...total,
                  marginValue.value.map((item: number, index: number) => (
                    <button
                      key={index}
                      onClick={(e: any) =>
                        handleSpace(
                          e,
                          itemClass.className,
                          item,
                          itemClass.title,
                        )
                      }
                      data-class={`${itemClass.className}-${item}`}
                      className="w-full px-4 py-2 text-left hover:bg-[#ccc]"
                    >{`${itemClass.title} : ${item * 4}px`}</button>
                  )),
                ]
              }, [])}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
