import {v4 as uuidv4} from "uuid"

export const generator = (countItem: number) => {
  let arr = []
  for (let i = 0; i < countItem; i++) {
    arr.push({
      id: uuidv4(),
      children: [
        {
          id: uuidv4(),
          component: {
            type: "",
            content: [],
          },
        },
      ],
    })
  }
  return arr
}
