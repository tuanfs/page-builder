import {useEffect, useContext} from "react"
import SectionEdit from "./SectionEdit"
import {v4 as uuidv4} from "uuid"
import {DropResult} from "../utils/type"
import {Draggable, Container} from "react-smooth-dnd"
import {applyDrag} from "../utils/applyDrag"
import {SectionContext} from "./SectionContext"

export default function ContentEdit() {
  const value = useContext(SectionContext)

  const {sectionList, setSectionList, preventDragSection} = value
  const getPayload = (index: number) => {
    return sectionList[index]
  }

  const handleDrop = async (e: DropResult) => {
    let sectionListNew = [...sectionList]

    sectionListNew = await applyDrag(sectionListNew, e)

    setSectionList([...sectionListNew])
  }

  useEffect(() => {
    let sectionListNew = JSON.parse(JSON.stringify(sectionList))

    let isEmpty = false
    sectionListNew = sectionList.map((item) => {
      return {
        ...item,
        children: item.children.map((child: any) => {
          if (child.children.length === 0) {
            isEmpty = true
            child.children = [
              {
                id: uuidv4(),
                component: {
                  type: "",
                  content: [],
                },
              },
            ]
          } else {
          }

          return {
            ...child,
            children: child.children,
          }
        }),
      }
    })
    if (isEmpty) {
      setSectionList(sectionListNew)
    }
  }, [sectionList])

  const handleAddSection = () => {
    setSectionList([
      ...sectionList,
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
                content: [],
              },
            ],
          },
        ],
      },
    ])
  }

  return (
    <div>
      <div className="my-8">
        <div className="flex">
          <button
            onClick={handleAddSection}
            className="bg-[#625bcb] text-white rounded-[4px] text-lg font-semibold px-5 py-2"
          >
            Add section
          </button>
        </div>
        <Container
          orientation="vertical"
          groupName="section"
          getChildPayload={getPayload}
          onDrop={(e: any) => handleDrop(e)}
          dragHandleSelector={`${preventDragSection ? ".prevent" : ""}`}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "cards-drop-preview",
          }}
          render={(ref) => {
            return (
              <ul ref={ref}>
                {sectionList &&
                  sectionList.map((item, index) => {
                    return (
                      <Draggable
                        key={index}
                        render={() => {
                          return <SectionEdit items={item} />
                        }}
                      />
                    )
                  })}
              </ul>
            )
          }}
        ></Container>
      </div>
    </div>
  )
}
