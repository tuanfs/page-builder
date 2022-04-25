import React from "react"
import {Section} from "../utils/type"

interface BannerProp {
  item: Section
}
export default function Banner({item}: BannerProp) {
  return (
    <div>
      {item.children.map((item, index) => (
        <div key={index}>
          {item.children.map((item, index) => (
            <div key={index}>
              <img src={item.content[0]} alt={item.content[1] || "Banner"} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
